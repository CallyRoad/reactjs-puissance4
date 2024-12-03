import React, { useEffect, useState } from "react";
import mgame from "./game.module.scss";
import Pawn from "./Pawn";
import { createGame } from "./logic/game";
import { victoryChecker } from "./logic/victoryCheck";
import { createGrid } from "./logic/newGrid";
const Grid = () => {
  // Game configuration
  const nbLines = 6;
  const nbColumns = 7;
  const randomPlayer = Math.round(Math.random() + 1);
  const [game, setGame] = useState(() =>
    createGame(createGrid(nbLines, nbColumns))
  );
  const [stopGame, setStopGame] = useState(false);
  const [loadingRandom, setLoadingRandom] = useState(true);
  // WinningLine will save the index line winner
  const [winningLine, setWinningLine] = useState([]);

  // Players and scores management
  const [currentPlayer, setCurrentPlayer] = useState(randomPlayer);
  const [scoreFirstPlayer, setScoreFirstPlayer] = useState(0);
  const [scoreSecondPlayer, setScoreSecondPlayer] = useState(0);
  const [draw, setDraw] = useState(false);
  const [winner, setWinner] = useState(null);
  const [storageScores, setStorageScores] = useState(() => {
    const stored = localStorage.getItem("scores");
    return stored ? JSON.parse(stored) : 0;
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
          let updateScore = scoreFirstPlayer + 1;
          setScoreFirstPlayer(updateScore);
          //Update local storage for the first player score
          const newScores = storageScores ? { ...storageScores, player1: storageScores.player1 + 1 } : { player1: updateScore, player2: 0 };
          localStorage.setItem("scores", JSON.stringify(newScores));
          setStorageScores(newScores);
        } else {
          let updateScore = scoreSecondPlayer + 1;
          setScoreSecondPlayer(updateScore);

          //Update local storage for the second player score
          const newScores = storageScores ? { ...storageScores, player2: storageScores.player2 + 1 } : { player1: 0, player2: updateScore };
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
    const resetScoresStorage = { player1: 0, player2: 0 };
    localStorage.setItem("scores", JSON.stringify(resetScoresStorage));
    setStorageScores(resetScoresStorage);
    setScoreFirstPlayer(0);
    setScoreSecondPlayer(0);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPlayer(randomPlayer);
      setLoadingRandom(false);
    }, 3000);
   return () => clearTimeout(timer);
  }, [randomPlayer]);

  return (
    <>
      {loadingRandom ? (
        <h3 className={mgame["round-info"]}>Choix du joueur qui commence...</h3>
      ) : (
        <h3 className={mgame["round-info"]}>
          {" "}
          C'est au tour du joueur {currentPlayer === 1 ? "JAUNE" : "ROUGE"}.
        </h3>
      )}

{/* Section start */}
      <section className={mgame["board"]}>

        {/* Scores display */}
        <article className={mgame["score"]}>
          {storageScores ? (
            <>
              <p>Joueur jaune : {storageScores.player1}</p>
              <p>Joueur rouge : {storageScores.player2}</p>
            </>
          ) : (
              <>
                <p>Joueur jaune : {scoreFirstPlayer}</p>
                <p>Joueur rouge : {scoreSecondPlayer}</p>
              </>
          )}
        </article>

        {/* Messages display */}
        {stopGame && !draw && (
            <article className={mgame["status-info"]}>
              <p>
                  🏆 Victoire du joueur {winner === 1 ? "jaune" : "rouge"} ! 🏆
              </p>
              <p>Partie terminée</p>
            </article>
        )}

        {draw && (
            <article className={mgame["status-info"]}>
              <p>Match nul !</p>
              <p>La grille est complète sans vainqueur</p>
            </article>
        )}

      {/* Generate the play grid */}
        {game.grid.map((line, lineIndex) => (
          <div key={lineIndex} className={mgame["line"]}>

            <p className={mgame["index-line"]} key={lineIndex}>
              {lineIndex}
            </p>

            {line.map((box, columnIndex) => (
              <Pawn
                value={box}
                key={columnIndex}
                onClick={() => handleBoxClick(lineIndex, columnIndex)}
                lineIndex={lineIndex}
                columnIndex={columnIndex}
                winningLine={winningLine}
              />
            ))}
          </div>
        ))}

        {/* Buttons container */}
        <div className={mgame["buttons-container"]}>
          <button onClick={handleResetBoard}>Recommencer</button>
          <button onClick={handleResetScores}> Réinitialiser les scores</button>
        </div>

      {/* End of section */}
      </section>
    </>
  );
};

export default Grid;
