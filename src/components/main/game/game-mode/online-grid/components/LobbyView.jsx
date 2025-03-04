import React, {useEffect, useState} from 'react';
// Styles
import mgame from '../../../game.module.scss';

// Components
import CreateGameForm from "./lobby-view/CreateGameForm";
import JoinGameForm from "./lobby-view/JoinGameForm";
import WaitingRoom from "./lobby-view/WaitingRoom";
import ErrorView from "./ErrorView";


/* Game lobby interface managing the pre-game phase of online multiplayer, renders different views based on current state :
 - Connection error if server is unreachable
 - Waiting room if game is created and awaiting opponent
 - Game creation and join forms if no game is in progress
 Manages socket connection status and appropriate user interface feedback */
const LobbyView = ({
                       gameState,
                       onCreateGame,
                       onJoinGame,
                       onBack,
                       socketConnected,
                       error
                   }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(loadingTimeout);
    }, []);

    useEffect(() => {
        if (error) {
            setShowError(true);
            setIsLoading(false);

            // reset error after display
            const errorTimeout = setTimeout(() => {
                setShowError(false);
            }, 3000);

            return () => clearTimeout(errorTimeout);
        }
    }, [error])

    if (showError && error) {
        return <ErrorView error={error} onBack={onBack} />;
    }

    // If loading, display a loading screen
    if (isLoading) {
        return (
            <div className={mgame.container}>
                <div className={mgame["loading-overlay"]}>
                    <div className={mgame["loading-spinner"]}></div>
                    <p>Connexion au serveur...</p>
                </div>
            </div>
        );
    }

    // If the socket is not connected after loading
    if (!socketConnected) {
        return (
            <div className={mgame.container}>
                <div className={mgame["connection-error"]}>
                    <h3>Serveur indisponible</h3>
                    <p>Impossible de se connecter au serveur de jeu.</p>
                    <button className={"back"} onClick={onBack}>Retour</button>
                </div>
            </div>
        );
    }


    return (
        <div className={mgame.container}>
            {gameState.gameId ? (
                <WaitingRoom gameId={gameState.gameId}/>
            ) : (
                <>
                    <CreateGameForm onCreateGame={onCreateGame}/>
                    <JoinGameForm onJoinGame={onJoinGame}/>
                </>
            )}
            <button className={"back"} onClick={onBack}>Retour</button>
        </div>
    )
};

export default LobbyView;