import http from "./httpService";
import config from "./config.json"


export const GetAllTweets = () =>{
    return http.get(`${config.LocalApi}/tweet/getalltweets`);
};


export const NewTweetRequest = (tweet) =>{
    return http.post(`${config.LocalApi}/tweet/newtweet`,tweet);
};

export const DeleteTweet = (tweetId) =>{
    return http.delete(`${config.LocalApi}/tweet/deletetweet/${tweetId}`);
};