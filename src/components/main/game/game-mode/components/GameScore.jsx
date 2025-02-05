import React from 'react';
import mgame from "../../game.module.scss";

const GameScore = ({
                       isOnline,
                       firstPlayerScore = 0,
                       secondPlayerScore = 0,
                       firstPlayerName = "jaune",
                       secondPlayerName = "rouge",
                       currentPlayerId,
                       opponentName}) => {
    if (isOnline) {
        return (
            <article className={mgame["score"]}>
                <p>Joueur jaune ({currentPlayerId === 1 ? "Vous" : opponentName}) : {firstPlayerScore}</p>
                <p>Joueur rouge ({currentPlayerId === 2 ? "Vous" : opponentName}) : {secondPlayerScore}</p>
            </article>
        );
    }
    if (!isOnline) {
        console.log("Scores des joueurs en local : ", "firstplayerscore:", firstPlayerScore, "secondplayerscore:", secondPlayerScore);
    }
    return (
        <article className={mgame["score"]}>
            <p>Joueur {firstPlayerName} : {firstPlayerScore}</p>
            <p>Joueur {secondPlayerName} : {secondPlayerScore}</p>
        </article>
    );
};

export default GameScore;