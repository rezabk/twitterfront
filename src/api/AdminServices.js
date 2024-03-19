import http from "./httpService";
import config from "./config.json";

export const loginAdmin = (user) => {
  return http.post(`${config.ecoinapi}auth/loginAdmin`, user);
};

export const showUsers = () => {
  return http.get(`${config.ecoinapi}auth/admin/getusers`);
};
