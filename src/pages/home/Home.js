import React, { useEffect, useState } from "react";

import { Divider } from "@mui/material";
import Header from "../../components/Header/Header";
import NewTweet from "./components/NewTweet";
import TweetList from "./components/TweetList";
import useStyles from "./styles";
import HomeIcon from "@mui/icons-material/Home";
import { GetAllTweets } from "./../../api/TweetService";
import {
  useTweetState,
  setTweetList,
  useTweetDispatch,
} from "../../context/TweetContext";

const Home = () => {
  const classes = useStyles();

  const [tweets, setTweets] = useState([]);
 

  // const { tweetList: tweets } = useTweetState();
  const tweetDispatch = useTweetDispatch();

  useEffect(() => {
    updateTweets();
  }, []);

  const updateTweets = async () => {
    await GetAllTweets()
      .then((res) => setTweets(res.data.result))
      .catch((err) => console.log(err));
  };


    

  return (
    <div className={classes.root}>
      <Header title={"خانه"} icon={<HomeIcon />} />
      <Divider className={classes.divider} />
      <NewTweet updateTweets={updateTweets} />
      <TweetList data={tweets}  />
    </div>
  );
};

export default Home;
