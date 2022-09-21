import axios from "axios";

export const getAxiosInstanceJsonServer = () => {
  return axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      all: {
        API_KEY: "aksdasdkpaosd",
      },
    },
  });
};

export const getAxiosMyAuthApi = () => {
  return axios.create({
    baseURL: "https://localhost:7057/api/auth/",
    headers: {
      all: {
        API_KEY: "aksdasdkpaosd",
      },
    },
  });
};


export const getAxiosInstanceAuth = () => {
  return axios.create({
    baseURL: "https://twitterapi.liara.run/api/",
    headers: {
      // API_KEY: "aksdasdkpaosd",
    },
  });
};

export const getAxiosInstanceApi = () => {
  return axios.create({
    baseURL: "https://twitterapi.liara.run/api/",
    headers: {
      "x-auth-token": localStorage.getItem("x-auth-token"),
    },
  });
};
