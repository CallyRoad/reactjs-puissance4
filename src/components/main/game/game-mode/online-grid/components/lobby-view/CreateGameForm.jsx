// React core
import React, {useState} from 'react';

// Style
import mgame from "../../../../game.module.scss";

/* Form component for creating a new online game session */
const CreateGameForm = ({ onCreateGame }) => {
    const [hostPlayer, setHostPlayer] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (hostPlayer.trim()) {
            onCreateGame(hostPlayer.trim());
        }
    };

    return (
        <div className={mgame["create-game-container"]}>
            <h3>Créer une partie</h3>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Votre pseudo"
                    value={hostPlayer}
                    onChange={(e) => setHostPlayer(e.target.value)}
                    minLength="3"
                    maxLength="20"
                    required
                />
                <button className={"join-game-button"} type="submit">Créer</button>
            </form>

        </div>
    )
};

export default CreateGameForm;