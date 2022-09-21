import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { CircularProgress, Divider, Typography } from "@mui/material";
import RightSidebar from "./../rightSidebar/RightSidebar";
import LeftSidebar from "../leftSidebar/LeftSidebar";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import ReactLoading from "react-loading";
import jwt_decode from "jwt-decode";
import { GetProfile } from "../../api/UserService";

const Layout = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [wait, setWait] = useState(true);


  const[user,setUser] = useState();
  const decodedToken = jwt_decode(localStorage.getItem("x-auth-token"));


  useEffect(async() => {
    await GetProfile(decodedToken.name)
    .then((res) => {
      localStorage.setItem("image", res.data.result.imageSrc);
      setUser(res.data.result);
    })
    .catch((err) => console.log(err));
    setWait(false);
  }, []);

  if (wait)
    return (
      <div className={classes.waitParent}>
        <CircularProgress className={"uni_m_b_small"} />
        شکیبا باشید
      </div>
    );
  else
    return (
      <div className={classes.root}>
        <RightSidebar data={user} />
        <Divider orientation="vertical" className={classes.divider} />

        <div className={classes.content}>{props.children}</div>

        <Divider orientation="vertical" className={classes.divider} />
        <LeftSidebar  data={user}/>
      </div>
    );
};

export default Layout;
