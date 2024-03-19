import http from "./httpService";
import config from "./config.json";

export const ReserveBook = (reserve) => {
  return http.post(`${config.LocalApi}/reservebook/reserve`, reserve);
};

export const GetReservedBooks = () => {
  return http.get(`${config.LocalApi}/reserveBook/ShowReservedBooks`);
};

export const CheckBack = (userId, bookId) => {
  return http.delete(
    `${config.LocalApi}/reserveBook/checkback/${userId}/${bookId}`
  );
};
