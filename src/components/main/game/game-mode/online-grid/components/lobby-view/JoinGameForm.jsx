// React core
import React, {useState} from 'react';

// Style
import mgame from "../../../../game.module.scss";

/* Form component for joining an existant online game session */
const JoinGameForm = ({onJoinGame}) => {
    const [secondPlayer, setSecondPlayer] = useState("");
    const [codeGame, setCodeGame] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (secondPlayer.trim() && codeGame) {
            onJoinGame({
                playerName: secondPlayer.trim(),
                gameId: codeGame
            });
        }
    };

    return (
        <div className={mgame["join-game-container"]}>

            <h3>Rejoindre la partie</h3>

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Votre pseudo"
                    value={secondPlayer}
                    onChange={(e) => setSecondPlayer(e.target.value)}
                    minLength="3"
                    maxLength="20"
                    required
                />
                <input
                    type="text"
                    placeholder="Code de la partie"
                    value={codeGame}
                    required
                    onChange={(e) => setCodeGame(e.target.value)}
                />
                <button className={"join-game-button"} type="submit">Rejoindre</button>
            </form>
        </div>
    );
};

export default JoinGameForm;