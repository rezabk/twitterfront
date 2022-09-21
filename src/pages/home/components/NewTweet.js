import { Button, Grid, IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import useStyles from "./styles";
import classnames from "classnames";
import { newTweetRequest } from "../../../api/api_tweet";
import { toast } from "react-toastify";

import {
  setTweetText as setTweet,
  updateHashTagsList,
  useTweetDispatch,
  useTweetState,
} from "../../../context/TweetContext";
import { NewTweetRequest } from "../../../api/TweetService";

const NewTweet = ({ updateTweets }) => {
  const inputFile = useRef();

  const { tweetText: tweet } = useTweetState();
  const tweetDispatch = useTweetDispatch();
  // const [tweet, setTweet] = useState();
  const [imageFile, setImageFile] = useState();
  const [imagePath, setImagePath] = useState();

  const newTweetClick = async () => {
    const tweetText = tweet;
    if (!tweetText) return;

    const formData = new FormData();
    formData.append("tweet", tweetText);
    formData.append("imageFile", imageFile);
  
      await NewTweetRequest(formData)
        .then((res) => {
          toast.success("توییت جدید ارسال شد");
          updateTweets();
          setTweet(tweetDispatch, "");
        })
        .catch((err) => {
          toast.error("مشکلی رخ داد");
          console.log(err);
        });
   };

  const getImage = () => {
    if (
      localStorage.getItem("image") &&
      localStorage.getItem("image") !== "undefined"
    )
      return localStorage.getItem("image");
    else return "/images/user.png";
  };
  const onChangeImg = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePath(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const selectImg = () => {
    inputFile.current.click();
  };

  const classes = useStyles();
  return (
    <div className={classes.newTweet}>
      <Grid container>
        <img
          src={getImage()}
          style={{ height: "60px", width: "60px", borderRadius: "50%" }}
        />
        <input
          className={classnames(classes.input)}
          placeholder="توییت کن..."
          value={tweet}
          onChange={(e) => setTweet(tweetDispatch, e.target.value)}
        />
        <input
          type={"file"}
          style={{ display: "none" }}
          ref={inputFile}
          onChange={onChangeImg}
        />
      </Grid>
      {imagePath && (
        <div>
          <div
            className={classes.tweetImg}
            style={{
              backgroundImage: `url(${imagePath})`,
            }}
          ></div>
        </div>
      )}

      <Grid container direction={"row-reverse"} style={{ marginTop: 16 }}>
        <Button
          className={classes.newTweetBtn}
          variant={"contained"}
          color={"primary"}
          className={classes.tweetBtn}
          onClick={newTweetClick}
        >
          توییت
        </Button>
        <IconButton style={{ width: "7%" }} onClick={selectImg}>
          <img src={"/images/image.png"} className={classes.newTweetImg} />
        </IconButton>
      </Grid>
    </div>
  );
};

export default NewTweet;
