import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import {
  ButtonBase,
  Grid,
  Typography,
  Divider,
  Input,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { getHashTags } from "../../api/api_tweet";
import {
  setHashTagList,
  useTweetDispatch,
  useTweetState,
} from "../../context/TweetContext";
import jwt_decode from "jwt-decode";
import {
  GetProfile,
  UpdateUser,
  UploadUserImage,
} from "./../../api/UserService";
import { isEmpty } from "lodash";
import { classnames } from "classnames";
import { toast } from "react-toastify";
const RightSidebar = ({data}) => {
  const classes = useStyles();

  const [user, setUser] = useState();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");


  useEffect(async () => {
     
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setUserName(data.userName);
    setPhoneNumber(data.phoneNumber);


    return () => {
      setFirstName();
      setLastName();
      setUserName();
      setPhoneNumber();
    };
  }, [data]);
  

  const validateUpdate = (user) => {
    if (!user.firstName) return "باید حتما نام خود را وارد کنید ";
    if (!user.lastName) return "باید حتما نام خانوادگی خود را وارد کنید ";
    if (!user.userName) return "باید حتما نام کاربری خود را وارد کنید ";
    if (!user.phoneNumber) return "باید حتما شماره موبایل خود را وارد کنید ";
  };


  const handleUpdateUser = async (event) => {
    event.preventDefault();
    const user = {
      firstName,
      lastName,
      userName,
      phoneNumber,
    };
    const error = validateUpdate(user);
    if (error) return toast.warn(error);
    
    await UpdateUser(user)
      .then((res) => toast.success("اطلاعات با موفقیت آپدیت شد"))
      .catch((err) => {
        console.log(err);
        toast.error("مشکلی پیش آمد ");
      });
  };


  return (
    <div className={classes.root}>
      <Link to="/">
        <Grid container direction={"row"} alignItems={"center"}>
          <Grid item>
            <img
              src={"/images/logo.png"}
              style={{ height: "50px", width: "100%" }}
            />
          </Grid>
          <Grid item>
            <Typography className={classes.logoType}>توییتر فارسی</Typography>
          </Grid>
        </Grid>
      </Link>

      <Link to={`/users/${userName}`}>
      <Button
          variant={"contained"}
          className={classes.userTweetsButton}
                 >
          توییت ها من 
        </Button>
        </Link>
      <Typography className={classes.userTitle}>اطلاعات کاربری </Typography>

      <Grid
        className={classes.box}
        container
        direction={"column"}
        alignItems={"center"}
      >
        <Grid style={{ marginTop: "3%", marginLeft: "5%" }}>
          <Typography className={classes.inputLabels}> نام :</Typography>
          <Input
            placeholder={!isEmpty(user) ? user.firstName : null}
            style={{ width: "100%", marginRight: "%" }}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <Typography className={classes.inputLabels}>
            {" "}
            نام خانوادگی :
          </Typography>
          <Input
            placeholder={!isEmpty(user) ? user.lastName : null}
            style={{ width: "100%", marginRight: "%" }}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <Typography className={classes.inputLabels}> نام کاربری :</Typography>
          <Input
            placeholder={!isEmpty(user) ? user.userName : null}
            style={{ width: "100%", marginRight: "%" }}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <Typography className={classes.inputLabels}>
            {" "}
            شماره موبایل :
          </Typography>
          <Input
            placeholder={!isEmpty(user) ? user.phoneNumber : null}
            style={{ width: "100%", marginRight: "%" }}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Grid>
        <Button
          variant={"contained"}
          className={classes.submitButton}
          onClick={handleUpdateUser}
        >
          ثبت
        </Button>
      </Grid>
    </div>
  );
};

export default RightSidebar;
