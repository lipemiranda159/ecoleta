import axios from "axios";
import State from "../models/State";

const ibgeService = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades",
});

interface StateResponse {
  id: number;
  nome: string;
  sigla: string;
}

function getStates(): State[] {
  let res: State[] = [];
  ibgeService.get<StateResponse[]>("estados?orderBy=nome").then((response) => {
    console.log(response.data);
    res = response.data.map((stateResp: StateResponse) => {
      return {
        id: stateResp.id,
        name: stateResp.nome,
        abbreviation: stateResp.sigla,
      };
    });
  });
  console.log(res);
  return res;
}

function getCities(uf: string) {
  ibgeService.get(`estados/${uf}/municipios?orderby=nome`).then((response) => {
    response.data.map((cityResp: any) => {
      return {
        id: cityResp.id,
        name: cityResp.nome,
      };
    });
    console.log(response.data);
  });
}

export { getStates, getCities };
