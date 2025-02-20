// React core
import React from 'react';

// Style
import mgame from "../../gamemode.module.scss";

const DisconnectionAlert = ({onBack }) => {
    return (
        <div className={mgame["disconnection-alert"]}>

            <h3>⚠️ Connexion au serveur perdue</h3>

            <p>La partie est terminée.</p>

            <div className={mgame["alert-buttons"]}>
                <button className={"back"} onClick={onBack}>Retour au menu</button>
            </div>
        </div>
    );
};

export default DisconnectionAlert;