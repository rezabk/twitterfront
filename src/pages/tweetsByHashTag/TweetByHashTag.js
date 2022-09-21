import { Divider } from "@mui/material";
import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import TweetList from "../home/components/TweetList";
import useStyles from "../home/styles";
import { toast } from "react-toastify";
import { useTweetDispatch, useTweetState } from "../../context/TweetContext";
import { useLocation } from "react-router-dom";
import { getTweetsByHashTagRequest } from "../../api/api_tweet";
const TweetByHashTag = (props) => {
  const location = useLocation();

  const { tweetList } = useTweetState();
  const tweetDispath = useTweetDispatch();

  useEffect(() => {
    getTweetsByHashTagRequest(props.match.params.hashtag, (isOk, data) => {
      if (!isOk) return toast.error(data);
      else setTweetList(tweetDispath, data);
    });
  }, [location]);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header
        title={props.match.params.hashtag}
        icon={
          <img
            src={"/images/hashtag.png"}
            style={{ height: "10%", width: "4%" }}
          />
        }
      />
      <Divider className={classes.divider} />

      <TweetList data={tweetList} />
    </div>
  );
};

export default TweetByHashTag;
