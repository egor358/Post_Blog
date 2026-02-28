import React from "react";
import { Link } from "react-router";

export const Header = () => {
  return (
    <>
      <header className="header">
        <h1 className="header__title">The Future of Green Energy</h1>

        <div className="header__text">
          <p>
            Our commitment to green energy is paving the way for a cleaner,
            healthier planet. Join us on a journey towards a future where clean,
            renewable energy sources transform the way we power our lives.
          </p>
        </div>

        <div className="header__btns">
         
            <Link className="btn" to={"/"}>Home</Link>
       
          <span className="btn-outline">
            <Link to={"Create_text"}>Create post</Link>
          </span>
        </div>
      </header>
    </>
  );
};
