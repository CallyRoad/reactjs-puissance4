// React core
import React from 'react';
// Styles
import mgame from "../../game.module.scss"

const ButtonsResets = ({handleResetBoard, handleResetScores}) => {
    return (
       // Resets  Buttons container
        <div className={mgame["buttons-container"]}>
            <button onClick={handleResetBoard}>Revanche</button>
            <button onClick={handleResetScores}> Réinitialiser les scores</button>
        </div>
    );
};

export default ButtonsResets;