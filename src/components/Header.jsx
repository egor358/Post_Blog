import React from "react";
import { Link } from "react-router";

export const Header = () => {
  return (
    <>
      <header className="header">
        <h1 className="header__title">Juventus — la Vecchia Signora</h1>

        <div className="header__text">
          <p>
            Juventus, la più grande d'Italia e tra le più grandi del mondo!
            Attira gli occhi di tutto il pianeta. Dà ai suoi tifosi emozioni
            travolgenti con un gioco spettacolare e una valanga di trofei.
            Unisciti alla famiglia bianconera: Fino alla fine! ⚪️⚫️
          </p>
        </div>

        <div className="header__btns">
          <Link className="btn" to={"/"}>
            Home
          </Link>

          <span className="btn-outline">
            <Link to={"Create_text"}>Create post</Link>
          </span>
        </div>
      </header>
    </>
  );
};
