import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import "./styles.css";
import logo from "../../assets/logo.svg";

const CreatePoint = () => {
  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="App de Coleta" />
        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>
      <form action="">
        <h1>Cadastro do ponto de coleta</h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>
          <div className="field">
            <label htmlFor="name">Nome do Estabelecimento</label>
            <input type="text" name="name" id="name" />
          </div>
          <div className="field-group">
            <div className="field">
              <label htmlFor="E-mail">E-mail</label>
              <input type="email" name="email" id="email" />
            </div>
            <div className="field">
              <label htmlFor="Whatsapp">Whatsapp</label>
              <input type="text" name="whatsapp" id="whatsapp" />
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <div className="fiel-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select name="uf" id="uf">
                <option value="0">Selecione uma UF</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="cidade">Cidade</label>
              <select name="cidade" id="cidade">
                <option value="0">Selecione uma cidade</option>
              </select>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <h2>Ítens de coleta</h2>
            <span>Selecine um ou mais dos ítens abaixo</span>
          </legend>
          <ul className="items-grid">
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="Óleo" />
              <span>Óleo</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="Óleo" />
              <span>Óleo</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="Óleo" />
              <span>Óleo</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="Óleo" />
              <span>Óleo</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="Óleo" />
              <span>Óleo</span>
            </li>
            <li className="selected">
              <img src="http://localhost:3333/uploads/oleo.svg" alt="Óleo" />
              <span>Óleo</span>
            </li>
          </ul>
        </fieldset>
        <button type="submit">Cadastrar o Estabelecimento</button>
      </form>
    </div>
  );
};

export default CreatePoint;