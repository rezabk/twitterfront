import http from "./httpService";
import config from "./config.json";

export const GetAllCharges = () => {
  return http.get(`${config.LocalApi}/charge`);
};
