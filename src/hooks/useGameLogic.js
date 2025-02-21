// React core
import {useState} from "react";

// Components
import {victoryChecker} from "../components/main/game/logic/victoryCheck";
import {createGame} from "../components/main/game/logic/game";
import {createGrid} from "../components/main/game/logic/newGrid";

/**
 * Custom hook managing core game logic and state for Connect Four
 *
 * @param {number} nbLines - Number of rows in the game grid
 * @param {number} nbColumns - Number of columns in the game grid
 *
 * @returns {Object} Game state and control functions
 * @property {Object} game - Current game grid state
 * @property {number|null} currentPlayer - ID of current player
 * @property {Object} scores - Current scores for both players
 * @property {number|null} winner - ID of winning player if game is won
 * @property {boolean} draw - Whether game ended in draw
 * @property {boolean} stopGame - Whether game should stop
 * @property {Array} winningLine - Coordinates of winning line if any
 * @property {Function} setCurrentPlayer - Updates current player
 * @property {Function} resetBoard - Resets game board to initial state
 * @property {Function} resetScores - Resets scores to zero
 * @property {Function} updateGameState - Updates game state after a move
 *
 * @example
 * const { game, currentPlayer, scores, winner, updateGameState } = useGameLogic(6, 7);
 */

export const useGameLogic = (nbLines, nbColumns) => {
    const [game, setGame] = useState(() => createGame(createGrid(nbLines, nbColumns)));
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const [scores, setScores] = useState({ player1: 0, player2: 0 });
    const [winner, setWinner] = useState(null);
    const [draw, setDraw] = useState(false);
    const [stopGame, setStopGame] = useState(false);
    const [winningLine, setWinningLine] = useState([]);

    // Reset board and scores
    const resetBoard = () => {
        setGame(createGame(createGrid(nbLines, nbColumns)));
        setWinner(null);
        setStopGame(false);
        setDraw(false);
        setWinningLine([]);
    };

    const resetScores = () => {
        setScores({ player1: 0, player2: 0 });
    };

    // Game state
    const updateGameState = (columnIndex, playedBy, nextPlayer) => {
        const updateGame = createGame(game.grid.slice());

        if (updateGame.placePawn(columnIndex, playedBy)) {
            const verifyVictory = victoryChecker(updateGame.grid);
            const isWinningMove = verifyVictory.verifyVictory(playedBy);
            const isDraw = verifyVictory.verifyDraw();

            setGame(updateGame);
            setCurrentPlayer(nextPlayer);

            if (isWinningMove) {
                setWinner(playedBy);
                setStopGame(true);
                setScores(prev => ({
                    ...prev,
                    [`player${playedBy}`]: prev[`player${playedBy}`] + 1
                }));
                setWinningLine(verifyVictory.getWinningLine(playedBy));
                return "ended";
            } else if (isDraw) {
                setDraw(true);
                setStopGame(true);
                return "ended";
            }
        }
        return "playing";
    };

    return {
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
        updateGameState
    };
};