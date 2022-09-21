import { Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import TweetList from "../home/components/TweetList";
import useStyles from "../home/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import { getTweetsByUserRequest } from "./../../api/api_tweet";
import { useLocation } from "react-router-dom";
import { GetUserTweets } from "./../../api/UserService";

const TweetByUser = (props) => {
  const classes = useStyles();

  const location = useLocation();

  const [tweets, setTweets] = useState([]);

  useEffect(async () => {
    await GetUserTweets(props.match.params.name)
      .then((res) => setTweets(res.data.result))
      .catch((err) => console.log(err));
  }, [location]);

console.log(tweets)
  return (
    <div className={classes.root}>
      <Header
        title={props.match.params.name}
        icon={<AccountCircleIcon fontSize="large" />}
      />
      <Divider className={classes.divider} />
      {tweets.length === 0 && (
        <Typography style={{ fontFamily: "Shabnam" }}>
          این کاربر هیچ توییتی تا به حال نداشته است
        </Typography>
      )}
      <TweetList data={tweets} />
    </div>
  );
};

export default TweetByUser;
