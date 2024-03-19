import http from "./httpService";
import config from "./config.json";

export const Register = (user) => {
  return http.post(`${config.LocalApi}/auth/register`, user);
};

export const Login = (user) => {
  return http.post(`${config.LocalApi}/auth/login`, user);
};

export const GetAllBooks = () => {
  return http.get(`${config.LocalApi}/Book/GetAllBooks`);
};
