// React core
import React from 'react';

// Style
import mgame from "../../../game.module.scss";

// messageUtils.js
import {getTurnMessage, getWinnerMessage} from "../../../../../../utils/messageUtils";


/* Displays the current game status, including turn information, winner announcement, and draw state */
const GameStatus = ({
                        isOnline,
                        winner,
                        draw,
                        gameState,
                        opponentName,
                        currentPlayer
                    }) => {
    return (
        <>
            {isOnline && gameState.status === "finished" ? null :
                <h3 className={mgame["round-info"]}>
                    {getTurnMessage(gameState, currentPlayer, isOnline, opponentName)}
                </h3>
            }

            {winner && (
                <article className={mgame["status-info"]}>
                    <p>{getWinnerMessage(winner, gameState, isOnline, opponentName)}</p>
                    {!isOnline && <p>Partie terminée</p>}
                </article>
            )}

            {draw && (
                <article className={mgame["status-info"]}>
                    <p>🤷‍♂️ Match nul ! 🤷‍♀️</p>
                    <p>La grille est complète sans vainqueur</p>
                </article>
            )}
        </>
    );
};

export default GameStatus;