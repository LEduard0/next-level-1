import React from "react";
import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import logo from "../../assets/logo.svg";
import "./styles.css";

const Header: React.FC = () => {
  const renderHeaderIcons = () => {
    switch (window.location.pathname) {
      case "/create-point":
        return (
          <Link to="/">
            <FiArrowLeft />
            Voltar para home
          </Link>
        );
      default:
        return (
          <div className="header-login flex items-center">
            <Link className="flex no-underline" to="/login">
              <span className="mr1">
                {" "}
                <FiUser />{" "}
              </span>
              <strong>Login</strong>
            </Link>
          </div>
        );
    }
  };

  return (
    <header className="header flex items-center justify-between w-100">
      <div className="header-logo flex items-center">
        <Link className="flex items-center no-underline" to="/">
          <img src={logo} alt="Coleta" />
          <h1>Trash Out</h1>
        </Link>
      </div>
      {renderHeaderIcons()}
    </header>
  );
};

export default Header;
