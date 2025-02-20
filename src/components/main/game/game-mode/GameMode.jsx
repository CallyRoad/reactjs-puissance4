// React core
import React, {useState} from 'react';

// Style
import mgamemode from "./gamemode.module.scss";

// Components
import Grid from "./local-grid/Grid";
import OnlineGrid from "./online-grid/OnlineGrid";

/* Main game mode selection component that handles switching between local and online gameplay */
const GameMode = () => {
    const [selectedMode, setSelectedMode] = useState(null);

    const handleModeSelect = (mode) => {
        setSelectedMode(mode);
    };

    if (selectedMode === "local") {
        return <Grid onBack={() => setSelectedMode(null)}/>;
    }

    if (selectedMode === "online") {
        if (selectedMode === "online") {
            return <OnlineGrid onBack={() => setSelectedMode(null)}/>;
        }
    }

    return (
        <div className={mgamemode.container}>

            <h2 className={mgamemode.title}>Choisissez votre mode de jeu</h2>

            <div className={mgamemode["button-wrapper"]}>

                {/* Buttons for select game mode (local/online) */}
                <button
                    className={`${mgamemode["mode-button"]} ${mgamemode["yellow-button"]}`}
                    onClick={() => handleModeSelect("local")}
                >
                    🎮 Partie Locale
                </button>
                <button
                    className={`${mgamemode["mode-button"]} ${mgamemode["red-button"]}`}
                    onClick={() => handleModeSelect("online")}
                >
                    🌐 Partie en Ligne
                </button>

            </div>
        </div>
    );
};

export default GameMode;