import http from "./httpService";
import config from "./config.json";

export const GetAllBooks = () => {
  return http.get(`${config.LocalApi}/Book/GetAllBooks`);
};

export const AddBook = (book) => {
  return http.post(`${config.LocalApi}/Book/AddBook`, book);
};

export const GetBookByName = (bookName) => {
  return http.get(`${config.LocalApi}/Book/GetBookByName/${bookName}`);
};

export const GetBookByWriterName = (writerName) => {
  return http.get(`${config.LocalApi}/Book/GetBookByWriterName/${writerName}`);
};

export const GetBookByCategory = (bookCategory) => {
  return http.get(`${config.LocalApi}/Book/GetBookByCategory/${bookCategory}`);
};

export const DeleteBook = (bookId) => {
  return http.delete(`${config.LocalApi}/Book/DeleteBook/${bookId}`);
};
