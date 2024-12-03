import React from 'react';
import mmain from './main.module.scss'
import Grid from './game/Grid';
const Main = () => {
    return (
        <main className={mmain.container}>
            <Grid/>
        </main>
    );
};

export default Main;