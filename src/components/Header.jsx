import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../css/style.css";

const Header = () => {
  return (

    <header>
      <img src={logo} className="logo" alt="logo" />
      <nav className="link-container">
        <Link to="*" className="link">Accueil</Link>
        <Link to="*" className="link">Profil</Link>
        <Link to="*" className="link">Réglages</Link>
        <Link to="*" className="link">Communauté</Link>
      </nav>
    </header>
  );
};

export default Header;