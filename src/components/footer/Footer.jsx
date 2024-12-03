import React from "react";
import mfooter from "./footer.module.scss";
const Footer = () => {
  return (
    <footer className={mfooter.footer}>
      <p>
        &copy; <a href="https://github.com/CallyRoad/" target="_blank" rel={"noreferrer"}>CallyRoad</a>
      </p>
    </footer>
  );
};

export default Footer;
