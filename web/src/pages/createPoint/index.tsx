import React, { useEffect, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { Map, TileLayer, Marker } from "react-leaflet";
import apiService from "../../services/apiService";
import { getStates, getCities } from "../../services/ibgeService";
import Item from "../../models/Item";
import State from "../../models/State";
import { FiArrowLeft } from "react-icons/fi";
import logo from "../../assets/logo.svg";
import "./styles.css";

//estado para array ou objeto: informar o tipo da variável

const CreatePoint = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [selectedUf, setSelectedUf] = useState<string>("0");

  useEffect(() => {
    apiService.get("items").then((response) => {
      setItems(response.data);
      console.log(response.data);
    });
  }, []);

  useEffect(() => {
    const stateDatas = getStates();
    console.log(stateDatas);
    setStates(stateDatas);
  }, []);

  useEffect(() => {}, []);

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedUf(event.target.value);
  }

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta" />
        <Link to="/">
          <FiArrowLeft />
          Voltar para Home
        </Link>
      </header>
      <form>
        <h1>
          Cadastro do <br /> ponto de coleta
        </h1>
        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input type="text" name="name" id="name" />
          </div>
          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input type="email" name="email" id="email" />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input type="text" name="whatsapp" id="whatsapp" />
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>
          <Map center={[-22.2360838, -45.9341824]} zoom={15}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[-22.2360838, -45.9341824]} />
          </Map>
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
                {states.map((state) => {
                  return (
                    <option key={state.id} value={state.abbreviation}>
                      {state.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select name="city" id="city">
                <option value="0">Selecione uma cidade</option>
              </select>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <h2>Itens de coleta</h2>
            <span>Selecione um ou mais itens abaixo</span>
          </legend>

          <ul className="items-grid">
            {items.map((item) => {
              return (
                <li key={item.id}>
                  <img src={item.image_url} alt={item.title} />
                  <span>{item.title}</span>
                </li>
              );
            })}
          </ul>
        </fieldset>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CreatePoint;
