import React, { ChangeEvent, useState, useEffect } from "react";
import Dropzone from "../../components/Dropzone";
import Header from "../../components/Header";
import axios from "axios";
import api from "../../services/api";
import "./styles.css";

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const PointChange: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
  }

  const handleSubmit = () => {};

  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      )
      .then((response) => {
        const ufInitials = response.data.map((uf) => uf.sigla);
        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === "0") return;

    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((response) => {
        const cityNames = response.data.map((city) => city.nome);
        setCities(cityNames);
      });
  }, [selectedUf]);

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;
    setSelectedUf(uf);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;
    setSelectedCity(city);
  }

  return (
    <div id="page-change-point">
      <div className="content">
        <Header />
        <form action="" onSubmit={handleSubmit}>
          <h1>Alteração do ponto de coleta</h1>

          <Dropzone onFileUploaded={setSelectedFile} />

          <fieldset>
            <legend>
              <h2>Dados</h2>
            </legend>
            <div className="field">
              <label htmlFor="name">Nome do Estabelecimento</label>
              <input
                onChange={handleInputChange}
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div className="field-group">
              <div className="field">
                <label htmlFor="E-mail">E-mail</label>
                <input
                  onChange={handleInputChange}
                  type="email"
                  name="email"
                  id="email"
                  required={true}
                />
              </div>
              <div className="field">
                <label htmlFor="Whatsapp">Whatsapp</label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="whatsapp"
                  id="whatsapp"
                  required={true}
                />
              </div>
            </div>
          </fieldset>
          <fieldset>
            <div className="field-group">
              <div className="field">
                <label htmlFor="uf">Estado (UF)</label>
                <select name="uf" id="uf"></select>
              </div>
              <div className="field">
                <label htmlFor="cidade">Cidade</label>
                <select name="cidade" id="cidade"></select>
              </div>
            </div>
          </fieldset>
          <button type="submit">Alterar o Estabelecimento</button>
        </form>
      </div>
    </div>
  );
};

export default PointChange;
