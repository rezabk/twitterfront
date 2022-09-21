import React, { useState, useEffect } from "react";
import { GetProfile } from "../../../api/UserService";
import Tweet from "./Tweet";
import jwt_decode from "jwt-decode";

const TweetList = ({ data }) => {
  const [user, setUser] = useState();
  const decodedToken = jwt_decode(localStorage.getItem("x-auth-token"));

  useEffect(async () => {
    await GetProfile(decodedToken.name)
      .then((res) => {
        setUser(res.data.result);
      })
      .catch((err) => console.log(err));
    
  }, []);

  return (
    <div>
      {[...data].reverse().map((tweet) => (
        <Tweet key={tweet.Id} data={tweet} userDetails={user} />
      ))}
    </div>
  );
};

export default TweetList;
