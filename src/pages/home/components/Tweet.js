import { Typography, IconButton, Grid } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { toast } from "react-toastify";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  LikeTweet,
  TweetLikesCount,
  UserLikeTweet,
} from "./../../../api/LikeTweetService";
import {
  likeTweet,
  setTweetText,
  useTweetDispatch,
} from "../../../context/TweetContext";
import { GetProfile } from "../../../api/UserService";
import { useLocation } from "react-router-dom";
import { isEmpty } from "lodash";
import { DeleteTweet } from "./../../../api/TweetService";

const Tweet = ({ data, userDetails }) => {
  const tweetDispatch = useTweetDispatch();

  const [user, setUser] = useState();
  const [userLikeTweet, setUserLikeTweet] = useState();
  const [tweetLikesCount, setTweetLikesCount] = useState();
  const [deleteIcon, setDeleteIcon] = useState(false);
  const [deletedTweet, setDeletedTweet] = useState(false);

  useEffect(async () => {
    await GetProfile(data.userId)
      .then((res) => {
        setUser(res.data.result);
        if (data.userName == res.data.userName) setDeleteIcon(true);
      })
      .catch((err) => console.log(err));

    await UserLikeTweet(data.id)
      .then((res) => setUserLikeTweet(res.data))
      .catch((err) => console.log(err));

    await TweetLikesCount(data.id)
      .then((res) => setTweetLikesCount(res.data))
      .catch((err) => console.log(err));
  }, [userLikeTweet, data]);

  const getImage = () => {
    if (user) return user.imageSrc;
    else return "/images/user.png";
  };

  const handleLike = async () => {
    await LikeTweet(data.id).then((res) => {
      if (res.data.messages[0] === "Tweet Liked") {
        setUserLikeTweet(true);
      } else {
        setUserLikeTweet(false);
      }
    });
  };

  const handleDeleteTweet = async () => {
    await DeleteTweet(data.id)
      .then((res) => {
        setDeletedTweet(true);
        toast.success("توییت حذف شد");
      })
      .catch((err) => {
        console.log(err);
        toast.err("مشکلی رخ داد");
      });
  };

  const retweetClick = () => {
    setTweetText(tweetDispatch, data.tweet);
  };

  const classes = useStyles();
  return (
    <div
      className={classes.tweetItem}
      style={{ display: deletedTweet ? "none" : null }}
    >
      <Grid style={{ direction: "ltr" }}>
        {data.userName == userDetails.userName ? (
          <CancelIcon
            color={"error"}
            onClick={handleDeleteTweet}
            style={{ cursor: "pointer" }}
          />
        ) : null}
      </Grid>
      <Grid container>
        <img
          src={getImage()}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
          }}
        />

        <Grid
          container
          item
          direction={"column"}
          style={{ marginRight: "1.2rem", width: "85%", marginTop: "1rem" }}
        >
          <Grid item container>
            <Typography className={classes.tweetItemName}>
              {data.tweet}
            </Typography>
            <Typography className={classes.tweetItemId}>
              {data.userName}
            </Typography>
          </Grid>

          <Typography
            className={classes.tweetText}
            component={"p"}
            // dangerouslySetInnerHTML={renderTweet(data.text)}
          />
          {data.imageSrc && (
            <div>
              <div
                className={classes.tweetImg}
                style={{
                  backgroundImage: `url(${data.imageSrc})`,
                }}
              ></div>
            </div>
          )}
        </Grid>
      </Grid>
      <Grid
        container
        direction={"row-reverse"}
        style={{ marginTop: 16 }}
        alignItems={"center"}
      >
        <IconButton style={{ width: "10%" }} onClick={retweetClick}>
          <img
            src={"/images/retweet.png"}
            style={{}}
            className={classes.newTweetImg}
          />
        </IconButton>
        <IconButton
          id="LikeIcon"
          style={{
            width: "7%",
            color: userLikeTweet == true ? "red" : "gray",
          }}
          onClick={handleLike}
        >
          <FavoriteIcon
            className={classes.newTweetImg}
            style={{ marginRight: "1rem" }}
          />
        </IconButton>
        <Typography className={classes.likeCount}>{tweetLikesCount}</Typography>
      </Grid>
    </div>
  );
};

export default Tweet;
