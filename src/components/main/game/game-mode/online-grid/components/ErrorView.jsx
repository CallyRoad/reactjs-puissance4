// React core
import React from 'react';

// Style
import mgame from "../../gamemode.module.scss";

/* Error display component for handling and showing game errors to users. Contains a specific error message. */
const ErrorView = ({error, onBack}) => {
    return (
        <article className={mgame.container}>
            <div
                className={mgame["error-box"]}
            >
                {/* Message */}
                <h3 className={mgame["error-title"]}>Une erreur est survenue</h3>
                <p className={mgame["error-message"]}>{error}</p>

                {/* Button to return to game mode */}
                <button
                    onClick={onBack}
                    className={mgame["error-button"]}
                >
                    Retour au menu
                </button>
            </div>
        </article>
    );
};

export default ErrorView;