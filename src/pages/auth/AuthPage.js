import React, { useState } from "react";
import { Tab, Tabs, Typography, Input, Button } from "@mui/material";
import useStyles from "./styles";
import { toast } from "react-toastify";
import { Login, Register, GetAllBooks } from "../../api/AuthService";
import axios from "axios";
import { ResetTvOutlined } from "@mui/icons-material";
import { Redirect } from "react-router";
import { loginAdmin } from "../../api/AdminServices";

const LOGIN_TAB_VALUE = 1;
const REGISTER_TAB_VALUE = 2;

const AuthPage = () => {
  const classes = useStyles();

  //login state
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleLogin = async () => {
    const user = {
      email: email,
      password: password,
    };

    const { status, data } = await loginAdmin(user);

    if (status === 200) {
      toast.success(data.messages[0]);
      localStorage.setItem("x-auth-token", data.result.accessToken);
      // <Redirect to={"/panel/userdetails"} />;
      window.location.reload();
    }
  };

  return (
    <div className={classes.container}>
      <Typography className={classes.headerText}>
        خوش آمدید به کتابخانه
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        aria-label="secondary tabs example"
      >
        <Tab className={classes.tab} value={LOGIN_TAB_VALUE} label="Login" />
      </Tabs>

      <div className={classes.containerInput}>
        <Typography style={{ fontFamily: "Shabnam", textAlign: "left" }}>
          Email
        </Typography>
        <Input
          className={"uni_m_b_small"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <Typography style={{ fontFamily: "Shabnam", textAlign: "left" }}>
          {" "}
          Password{" "}
        </Typography>
        <Input
          type="password"
          className={"uni_m_b_small"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
        <Button
          variant={"contained"}
          color="primary"
          style={{ fontFamily: "Shabnam" }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default AuthPage;
