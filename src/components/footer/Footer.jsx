import React from "react";
import mfooter from "./footer.module.scss";

const Footer = () => {
    return (
        <footer className={mfooter.footer}>
            <p>&copy; CallyRoad</p>
            <p>
                <a
                    href="https://github.com/CallyRoad/"
                    target="_blank" rel="noreferrer noopener"
                    aria-label="Visiter le profil GitHub de CallyRoad">
                    Github
                </a>
            </p>
            <p>
                <a
                    href="https://portfolio-coralie-venuat.rainacally.com/"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Voir le portfolio de CallyRoad">
                    Portfolio
                </a>
            </p>
        </footer>
    );
};

export default Footer;
