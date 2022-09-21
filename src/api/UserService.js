import http from "./httpService";
import config from "./config.json"

export const GetAllUsers = () =>{
    return http.get(`${config.LocalApi}/user/GetAllUsers`);
};

export const GetProfile = (userId) =>{
    return http.get(`${config.LocalApi}/user/getprofile/${userId}`);
};

export const GetUserTweets = (userName) =>{
    return http.get(`${config.LocalApi}/user/gettweetsbyusername/${userName}`);
};

export const UpdateUser = (user) =>{
    return http.put(`${config.LocalApi}/user/editprofile/`,user);
};


export const UploadUserImage = (image) =>{
    return http.post(`${config.LocalApi}/user/uploaduserphoto`,image);
};