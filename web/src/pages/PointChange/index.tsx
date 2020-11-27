import React, { ChangeEvent, useState, useEffect } from "react";
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

interface Item {
  id: number;
  title: string;
  image_url: string;
}

const initialState = () => {
  return {
    city: "Atibaia",
    email: "",
    id: 0,
    image: "",
    latitude: 0,
    longitude: 0,
    name: "",
    uf: "",
    whatsapp: "",
  };
};

const PointChange: React.FC = () => {
  const localStoragePoint: any = localStorage.getItem("pointData");
  const localStoragePointItems: any = localStorage.getItem("pointItems");
  const [items, setItems] = useState<Item[]>([]);
  const [values, setValues] = useState(initialState);
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState(values.uf);
  const [selectedCity, setSelectedCity] = useState(values.city);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  }

  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.findIndex((item) => item === id);

    if (alreadySelected >= 0) {
      const fielteredItems = selectedItems.filter((item) => item !== id);

      setSelectedItems(fielteredItems);
    } else setSelectedItems([...selectedItems, id]);
  }

  useEffect(() => {
    api.get("items").then((response) => {
      setItems(response.data);
    });
  }, []);

  const handleSubmit = () => {};

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

  useEffect(() => {
    if (localStoragePoint && localStoragePointItems) {
      const point = JSON.parse(localStoragePoint);
      const items = JSON.parse(localStoragePointItems);
      var idItems: number[] = [];

      setValues({ ...point });
      setSelectedUf(point.uf);
      setSelectedCity(point.city);

      items.forEach((item: any) => {
        idItems.push(item.id);
      });
      setSelectedItems(idItems);
    }
  }, [localStoragePoint]);

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

          <div className="point-image">
            <img
              src={`http://localhost:3333/uploads/${values.image}`}
              alt={values.name}
            />
          </div>

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
                value={values.name}
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
                  value={values.email}
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
                  value={values.whatsapp}
                />
              </div>
            </div>
          </fieldset>
          <fieldset>
            <div className="field-group">
              <div className="field">
                <label htmlFor="uf">Estado (UF)</label>
                <select
                  name="uf"
                  id="uf"
                  value={selectedUf}
                  onChange={handleSelectUf}
                >
                  <option value="0">Selecione uma UF</option>
                  {ufs.map((uf) => (
                    <option key={uf} value={uf}>
                      {uf}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="cidade">Cidade</label>
                <select
                  name="cidade"
                  id="cidade"
                  value={selectedCity}
                  onChange={handleSelectCity}
                >
                  <option value="0">Selecione uma cidade</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
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
              {items.map((item) => {
                return (
                  <li
                    key={item.id}
                    onClick={() => {
                      handleSelectItem(item.id);
                    }}
                    className={
                      selectedItems.includes(item.id) ? "selected" : ""
                    }
                  >
                    <img src={item.image_url} alt={item.title} />
                    <span>{item.title}</span>
                  </li>
                );
              })}
            </ul>
          </fieldset>
          <button type="submit">Alterar o Estabelecimento</button>
        </form>
      </div>
    </div>
  );
};

export default PointChange;
