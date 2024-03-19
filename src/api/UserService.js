import http from "./httpService";
import config from "./config.json";

export const GetUserById = (userId) => {
  return http.get(`${config.LocalApi}/user/${userId}`);
};
