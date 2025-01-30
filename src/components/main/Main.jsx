import React from 'react';
// Style
import mmain from './main.module.scss';

// Component
import GameMode from "./game/game-mode/GameMode";

const Main = () => {
    return (
        <main className={mmain.container}>
            <GameMode/>
        </main>
    );
};

export default Main;