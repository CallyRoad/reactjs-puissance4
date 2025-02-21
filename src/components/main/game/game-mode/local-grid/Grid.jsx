// React core
import React, { useEffect, useState } from "react";

//Styles
import mgame from "../../game.module.scss";

// Components
import ButtonsResets from "../components/ButtonsResets";
import GameScore from "../components/GameScore";
import GameStatus from "../online-grid/components/GameStatus";
import GameGrid from "../online-grid/components/GameGrid";

// Logic
import { createGame } from "../../logic/game";
import { victoryChecker } from "../../logic/victoryCheck";
import { createGrid } from "../../logic/newGrid";
import DisconnectionAlert from "../online-grid/components/DisconnectionAlert";

// Local multiplayer game grid component
const Grid = ({onBack}) => {
  // Game configuration
  const nbLines = 6;
  const nbColumns = 7;
  const randomPlayer = Math.round(Math.random() + 1);

  const [game, setGame] = useState(() =>
    createGame(createGrid(nbLines, nbColumns))
  );
  const [stopGame, setStopGame] = useState(false);
  const [loadingRandom, setLoadingRandom] = useState(true);
  const [winningLine, setWinningLine] = useState([]);   // WinningLine will save the index line winner


  // Players and scores management
  const [currentPlayer, setCurrentPlayer] = useState(randomPlayer);
  const [scores, setScores] = useState({
    player1: 0,
    player2: 0
  });
  const [draw, setDraw] = useState(false);
  const [winner, setWinner] = useState(null);

  const [storageScores, setStorageScores] = useState(() => {
    const stored = localStorage.getItem("scores");
    return stored ? JSON.parse(stored) : { player1: 0, player2: 0 };
  });

  // Victory Check
  const checkVictory = (currentPlayer) => {
    const verifyVictory = victoryChecker(game.grid);

    if (verifyVictory.verifyVictory(currentPlayer)) {
      const line = verifyVictory.getWinningLine(currentPlayer);
      setWinningLine(line);
      return true
    }
    return false;
  };

  // handleBoxClick : manage the click
  const handleBoxClick = (lineIndex, columnIndex) => {
    if (stopGame) {
      return;
    }

    let updateGame = createGame(game.grid.slice());

    if (updateGame.placePawn(columnIndex, currentPlayer)) {
      const verifyVictory = victoryChecker(game.grid);
      setGame(updateGame);

      if (checkVictory(currentPlayer)) {
        setWinner(currentPlayer);
        setStopGame(true);

        if (currentPlayer === 1) {
          let updateScore = scores.player1 + 1;

          setScores(prev => ({
            ...prev,
            player1: updateScore
          }));

          const newScores = storageScores
              ? { ...storageScores, player1: storageScores.player1 + 1 }
              : { player1: updateScore, player2: 0 };

          localStorage.setItem("scores", JSON.stringify(newScores));
          setStorageScores(newScores);
        } else {
            const updateScore = scores.player2 +1;

            setScores(prev => ({
              ...prev,
              player2: updateScore
            }))

          const newScores = storageScores
              ? { ...storageScores, player2: storageScores.player2 + 1 }
              : { player1: 0, player2: updateScore };

          localStorage.setItem("scores", JSON.stringify(newScores));
          setStorageScores(newScores);
        }
      } else if (verifyVictory.verifyDraw()) {
          setStopGame(true);
          setDraw(true);
      } else {
          setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      }
    }
  };
  
  // handleResetBoard resets the game grid
  const handleResetBoard = () => {
    setGame(createGame(createGrid(nbLines, nbColumns)));
    setCurrentPlayer(randomPlayer);
    setDraw(false);
    setStopGame(false);
    setWinningLine([]);
  };

  // handleResetScore resets the score from localstorage and state
  const handleResetScores = () => {
    const resetScores = { player1: 0, player2: 0 };

    localStorage.setItem("scores", JSON.stringify(resetScores));
    setStorageScores(resetScores);
    setScores(resetScores);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPlayer(randomPlayer);
      setLoadingRandom(false);
    }, 3000);
   return () => clearTimeout(timer);
  }, [randomPlayer]);

  return (
      <section className={mgame["board"]}>
        {/* Scores display */}
        <GameScore
            isOnline={false}
            firstPlayerScore={storageScores.player1 || scores.player1}
            secondPlayerScore={storageScores.player2 || scores.player2}
        />

        {/* Messages display */}
        <GameStatus
            isOnline={false}
            winner={winner}
            draw={draw}
            currentPlayer={currentPlayer}
            loadingRandom={loadingRandom}
        />

      {/* Generate the game grid */}
        <GameGrid
          game={game}
          onMovePlayed={handleBoxClick}
          winningLine={winningLine}
        />

        {/* Buttons container */}
          <ButtonsResets
              handleResetBoard={handleResetBoard}
              handleResetScores={handleResetScores}
              onBack={onBack}
          />

      {/* End of section */}
      </section>


  );
};

export default Grid;

