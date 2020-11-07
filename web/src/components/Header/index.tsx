import React from "react";
import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import "./styles.css";

const Header: React.FC = () => {
  return (
    <header className="header flex items-center justify-between w-100">
      <div className="header-logo flex items-center">
        <Link className="flex items-center no-underline" to="/">
          <img src={logo} alt="Coleta" />
          <h1>Trash Out</h1>
        </Link>
      </div>
      <div className="header-login flex items-center">
        <Link className="flex no-underline" to="/login">
          <span className="mr1">
            {" "}
            <FiUser />{" "}
          </span>
          <strong>Login</strong>
        </Link>
      </div>
    </header>
  );
};

export default Header;
