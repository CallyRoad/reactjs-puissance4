// React core
import React, {useEffect, useState} from 'react';

// Components
import ConfirmationDialog from "./components/ConfirmationDialog";
import ButtonsResets from "../components/ButtonsResets";
import GameGrid from "./components/GameGrid";
import GameStatus from "./components/GameStatus";
import GameScore from "../components/GameScore";
import LobbyView from "./components/LobbyView";
import ErrorView from "./components/ErrorView";
import DisconnectionAlert from "./components/DisconnectionAlert";

// Hooks
import {useSocketConnection} from "../../../../../hooks/useSocketConnection";
import {useGameState} from "../../../../../hooks/useGameState";
import {useGameLogic} from "../../../../../hooks/useGameLogic";
import {useResetDialog} from "../../../../../hooks/useResetDialog";

// Styles
import mgame from "../../game.module.scss";

/* Online multiplayer game grid component handling real-time gameplay through WebSocket */
const OnlineGrid = ({onBack}) => {
    // Grid parameters
    const nbLines = 6;
    const nbColumns = 7;

    // Custom hooks
    const {socket, socketConnected, serverDisconnected} = useSocketConnection();
    const {gameState, updateGameState, resetGameState} = useGameState();
    const {
        game,
        currentPlayer,
        scores,
        winner,
        draw,
        stopGame,
        winningLine,
        setCurrentPlayer,
        resetBoard,
        resetScores,
        updateGameState: updateGame
    } = useGameLogic(nbLines, nbColumns);

    const {
        showConfirmationDialog,
        pendingReset,
        openResetDialog,
        closeResetDialog
    } = useResetDialog();

    // Error message
    const [error, setError] = useState(null);

    useEffect(() => {
        // Socket session initialization
        if (socketConnected) {
            socket.emit("initSession", null);
        }

        // Error handling
        socket.on("gameError", (error) => {
            setError(error);
            resetGameState();
        });

        socket.on("sessionCreated", (sessionId) => {
            localStorage.setItem("playerSessionId", JSON.stringify(sessionId));
        });

        socket.on("gameCreated", ({gameId, playerId, playerName}) => {
            updateGameState({
                gameId,
                playerId,
                playerName,
                status: "waiting" // game state (waiting, joining, playing, finished)
            });
        });

        socket.on("prepareGame", (data, ack) => {
            updateGameState({
                status: "preparing",
                gameId: data.gameId, // unique game id
                playerId: data.playerId, // unique player id
                playerName: data.playerName,
                opponentName: data.opponentName, // opponent player
            });
            ack(); // acknowledge receipt of game preparation data to server, ensures both players are ready before starting
        });

        socket.on("gameStarted", ({startingPlayer}) => {
            updateGameState({status: "playing"});
            setCurrentPlayer(startingPlayer);
        });

        socket.on("opponentPlayed", ({columnIndex, playedBy, nextPlayer}) => {
            const newStatus = updateGame(columnIndex, playedBy, nextPlayer);
            if (newStatus === "finished") {
                updateGameState({status: "finished"});
            }
        });

        // Reset board and scores
        socket.on("resetBoardRequested", () => {
            openResetDialog("board");
        });

        socket.on("resetScoresRequested", () => {
            openResetDialog("scores");
        });

        socket.on("boardReset", ({startingPlayer}) => {
            resetBoard();
            setCurrentPlayer(startingPlayer);
            updateGameState({status: "playing"});
        });

        // Player left
        socket.on("resetScores", resetScores);

        socket.on("hostLeft", () => {
            setError("L'hôte a quitté la partie. La partie est terminée");
            resetGameState();
        });

        socket.on("playerLeft", (data) => {
            if (data?.playerName) {
                setError(`${data.playerName} a quitté la partie.`);
            }
            updateGameState({
                status: "waiting",
                opponentName: ""
            });
        });

        // Clean socket
        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("sessionCreated");
            socket.off("gameCreated");
            socket.off("prepareGame");
            socket.off("gameStarted");
            socket.off("opponentPlayed");
            socket.off("gameError");
            socket.off("resetBoard");
            socket.off("resetScores");
            socket.off("resetBoardRequested");
            socket.off("resetScoresRequested");
            socket.off("hostLeft");
            socket.off("playerLeft");
        };
    }, [socket, game, currentPlayer, gameState, socketConnected]);

    const handleCreateGame = (playerName) => {
        socket.emit("createGame", {playerName});
        updateGameState({
            status: "creating",
            playerName
        });
    };

    const handleJoinGame = ({playerName, gameId}) => {
        socket.emit("joinGame", {
            gameId,
            playerName
        });
        updateGameState({
            status: "joining",
            playerName
        });
    };

    const handleMovePlayed = (lineIndex, columnIndex) => {
        if (stopGame || winner ||
            gameState.status !== "playing" ||
            currentPlayer !== gameState.playerId) {
            return;
        }

        socket.emit("movePlayed", {
            gameId: gameState.gameId,
            columnIndex,
        });
    };

    const handleConfirmReset = () => {
        if (pendingReset === "board") {
            socket.emit("confirmResetBoard", {gameId: gameState.gameId});
            resetBoard();
            setCurrentPlayer(1);
            updateGameState({status: "playing"});
        } else {
            socket.emit("confirmResetScores", {gameId: gameState.gameId});
            resetScores();
        }
        closeResetDialog();
    };

    // Handle reset
    const handleCancelReset = () => {
        socket.emit("rejectReset", {gameId: gameState.gameId});
        closeResetDialog();
    };

    const handleResetBoard = () => {
        socket.emit("requestResetBoard", {gameId: gameState.gameId});
    };

    const handleResetScores = () => {
        socket.emit("requestResetScores", {gameId: gameState.gameId});
    };

    // Game state and error view

    if (gameState.status === "waiting" || gameState.status === "creating") {
        return (
            <LobbyView
                gameState={gameState}
                onCreateGame={handleCreateGame}
                onJoinGame={handleJoinGame}
                onBack={onBack}
                socketConnected={socketConnected}
            />
        );
    }

    if (error) {
        return <ErrorView error={error} onBack={onBack}/>;
    }

    return (
        <section className={mgame.board}>

            <article className={serverDisconnected ? mgame["game-disconnected"] : ""}>
                {/* Game score */}
                <GameScore
                    isOnline={true}
                    currentPlayerId={gameState.playerId}
                    opponentName={gameState.opponentName}
                    firstPlayerScore={scores.player1}
                    secondPlayerScore={scores.player2}
                />

                {/* Game status */}
                <GameStatus
                    isOnline={true}
                    winner={winner}
                    draw={draw}
                    gameState={gameState}
                    currentPlayer={currentPlayer}
                    opponentName={gameState.opponentName}
                />

                {/* Game board */}
                <GameGrid
                    gameId={gameState.gameId}
                    game={game}
                    onMovePlayed={handleMovePlayed}
                    winningLine={winningLine}
                />

                {/* Resets buttons for board and scores */}
                <ButtonsResets
                    handleResetBoard={handleResetBoard}
                    handleResetScores={handleResetScores}
                />

                {/* Confirmation dialog for restart game or reset scores */}
                <ConfirmationDialog
                    isOpen={showConfirmationDialog}
                    message={pendingReset === "board"
                        ? "L'adversaire souhaite recommencer la partie. Acceptez-vous ?"
                        : "L'adversaire souhaite réinitialiser les scores. Acceptez-vous ?"}
                    onConfirm={handleConfirmReset}
                    onCancel={handleCancelReset}
                />
            </article>

            {/* Alert when server is disconnected */}
            {serverDisconnected &&
                <DisconnectionAlert
                    onBack={onBack}
                />
            }
        </section>
    );
};

export default OnlineGrid