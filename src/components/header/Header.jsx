import React from 'react';
import mheader from "./header.module.scss"

const Header = () => {
    return (
        <header>
            <h1 className={mheader.title}>Puissance 4</h1>
        </header>
    );
};

export default Header;