import http from "./httpService";
import config from "./config.json";

export const loginAdmin = (user) => {
  return http.post(`${config.ecoinapi}auth/loginAdmin`, user);
};
