// React core
import React, {useState} from 'react';

// Styles
import mgame from "../../../../game.module.scss";

/* Displays a waiting room interface where players can see and copy the game ID while waiting for opponents */
const WaitingRoom = ({gameId}) => {
    const [showCopyNotification, setShowCopyNotification] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(gameId);
            setShowCopyNotification(true);

            // notification disappears
            setTimeout(() => {
                setShowCopyNotification(false);
            }, 2000);

        } catch (error) {
            console.log("Erreur lors de la copie", error);
        }
    }

    return (
        <div className={mgame["waiting-room-container"]}>
            {/* Game code for join room */}
            <h3>Code de la partie :
                <span
                    onClick={handleCopy}
                    className={mgame["game-code"]}
                    title="Cliquer pour copier"
                >
                    {gameId} 📌
                </span>
            </h3>

            {/* Copy notification */}
            {showCopyNotification && (
                <div className={mgame["copy-notification"]}>
                    Code copié !
                </div>
            )}
            <p>En attente d'un autre joueur...</p>
        </div>
    );
};

export default WaitingRoom;