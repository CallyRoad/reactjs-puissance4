// React core
import React from 'react';
// Styles
import mgame from "../../game.module.scss"

const ButtonsResets = ({
                           handleResetBoard,
                           handleResetScores,
                           onBack,
                           isOnline = false,
                           socket = null
                       }) => {

    const handleLeaveGame = () => {
        // Disconnect socket if is online game
        if (isOnline && socket) {
            socket.disconnect();
        }

        // Back to menu
        onBack();
    };

    return (
        <>
            {/*Resets Buttons container*/}
            <div className={mgame["buttons-container"]}>
                <button
                    className={"reset"}
                    onClick={handleResetBoard}
                    title={"Relance une partie"}
                >
                    Revanche
                </button>

                <button
                    className={"reset"}
                    onClick={handleResetScores}
                    title={"Réinitialise les scores à 0"}
                >
                    Réinitialiser les scores
                </button>
            </div>
            {/*Leave the game*/}
            <button
                className={"leave-game"}
                onClick={handleLeaveGame}
                title={isOnline ? "Quitter et déconnecter" : "Retour au menu"}
            >
                Quitter la partie
            </button>
        </>
    );
};

export default ButtonsResets;