import http from "./httpService";
import config from "./config.json";

export const loginAdmin = (user) => {
  return http.post(`${config.ecoinapi}auth/loginAdmin`, user);
};

export const showUsers = () => {
  return http.get(`${config.ecoinapi}admin/getusers`);
};

export const changePassword = (user) => {
  return http.post(`${config.ecoinapi}admin/changepassword`, user);
};

export const showDeposits = () => {
  return http.get(`${config.ecoinapi}admin/showdeposits`);
};

export const confirmDeposit = (id) => {
  return http.post(`${config.ecoinapi}admin/confirmdeposit`, id);
};
