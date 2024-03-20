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

export const showWithdraws = () => {
  return http.get(`${config.ecoinapi}admin/showwithdraws`);
};

export const confirmDeposit = (id) => {
  return http.post(`${config.ecoinapi}admin/confirmdeposit`, id);
};

export const confirmWithdraw = (withdraw) => {
  return http.post(`${config.ecoinapi}admin/confirmWithdraw`, withdraw);
};

export const deleteDeposit = (depositId) => {
  return http.post(`${config.ecoinapi}admin/deletedeposit/`, depositId);
};

export const deleteWithdraw = (withdrawId) => {
  return http.post(`${config.ecoinapi}admin/deletewithdraw/`, withdrawId);
};

export const addVpn = (vpn) => {
  return http.post(`${config.ecoinapi}vpn/add/`, vpn);
};

export const vpnCount = (vpn) => {
  return http.get(`${config.ecoinapi}admin/vpnCount`, vpn);
};
