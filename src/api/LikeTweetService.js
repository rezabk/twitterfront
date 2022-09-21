import http from "./httpService";
import config from "./config.json"


export const LikeTweet = (tweetId) =>{
    return http.post(`${config.LocalApi}/liketweet/liketweet/${tweetId}`);
};

export const UserLikeTweet = (tweetId) =>{
    return http.get(`${config.LocalApi}/liketweet/usertweetlikes/${tweetId}`);
};

export const TweetLikesCount = (tweetId) =>{
    return http.get(`${config.LocalApi}/liketweet/tweetlikescount/${tweetId}`);
};
