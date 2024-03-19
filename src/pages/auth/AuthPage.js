import React, { useState } from "react";
import { Tab, Tabs, Typography, Input, Button } from "@mui/material";
import useStyles from "./styles";
import { toast } from "react-toastify";
import { Login, Register, GetAllBooks } from "../../api/AuthService";
import axios from "axios";
import { ResetTvOutlined } from "@mui/icons-material";
import { Redirect } from "react-router";

const LOGIN_TAB_VALUE = 1;
const REGISTER_TAB_VALUE = 2;

const AuthPage = () => {
  const classes = useStyles();

  const [tab, setTab] = useState(LOGIN_TAB_VALUE);

  //login state
  const [phoneNumberLogin, setPhoneNumberLogin] = useState();
  const [passwordLogin, setPasswordLogin] = useState();

  //register state
  const [fullNameRegister, setFullNameRegister] = useState();
  const [phoneNumberRegister, setPhoneNumberRegister] = useState();
  const [passwordRegister, setPasswordRegister] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();

  const handleChangeTab = (e, newValue) => {
    setTab(newValue);
  };

  const validateLogin = (user) => {
    if (!user.phoneNumber) return "باید حتما یوزرنیم خود را وارد کنید ";
    if (!user.Password) return "باید حتما پسوورد خود را وارد کنید ";
  };

  const validateRegister = (user) => {
    if (!user.FullName) return "باید حتما نام خود را وارد کنید";
    if (!user.PhoneNumber) return "باید حتما شماره موبایل خود را وارد کنید ";
    if (!user.Password) return "باید حتما پسوورد خود را وارد کنید ";
    if (user.password !== user.passwordConfirmation)
      return "رمز ها باید مشابه باشند";
  };

  const handleRegister = async () => {
    const user = {
      FullName: fullNameRegister,
      PhoneNumber: phoneNumberRegister,
      Password: passwordRegister,
      PasswordConfirmation: passwordConfirmation,
    };

    const error = validateRegister(user);
    if (error) return toast.warn(error);

    const { status, data } = await Register(user);

    if (status == 201) {
      toast.success("ثبت نام موفقیت آمیز بود");
      localStorage.setItem("x-auth-token", data.result.accessToken);
      window.location.reload();
    }
  };

  const handleLogin = async () => {
    const user = {
      phoneNumber: phoneNumberLogin,
      Password: passwordLogin,
    };
    const error = validateLogin(user);
    if (error) return toast.warn(error);

    const { status, data } = await Login(user);

    if (status == 201) {
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
        value={tab}
        onChange={handleChangeTab}
        textColor="primary"
        indicatorColor="primary"
        aria-label="secondary tabs example"
      >
        <Tab className={classes.tab} value={LOGIN_TAB_VALUE} label="ورود" />
        <Tab
          className={classes.tab}
          value={REGISTER_TAB_VALUE}
          label="ثبت نام"
        />
      </Tabs>
      {tab === LOGIN_TAB_VALUE && (
        <div className={classes.containerInput}>
          <Typography style={{ fontFamily: "Shabnam" }}>
            شماره موبایل{" "}
          </Typography>
          <Input
            className={"uni_m_b_small"}
            value={phoneNumberLogin}
            onChange={(e) => setPhoneNumberLogin(e.target.value)}
          ></Input>
          <Typography style={{ fontFamily: "Shabnam" }}> رمز عبور</Typography>
          <Input
            type="password"
            className={"uni_m_b_small"}
            value={passwordLogin}
            onChange={(e) => setPasswordLogin(e.target.value)}
          ></Input>
          <Button
            variant={"contained"}
            color="primary"
            style={{ fontFamily: "Shabnam" }}
            onClick={handleLogin}
          >
            ورود
          </Button>
        </div>
      )}

      {tab === REGISTER_TAB_VALUE && (
        <div className={classes.containerInput}>
          <Typography style={{ fontFamily: "Shabnam" }}>
            {" "}
            نام و نام خانوادگی
          </Typography>
          <Input
            className={"uni_m_b_small"}
            value={fullNameRegister}
            onChange={(e) => setFullNameRegister(e.target.value)}
          ></Input>

          <Typography style={{ fontFamily: "Shabnam" }}>
            {" "}
            شماره موبایل
          </Typography>
          <Input
            className={"uni_m_b_small"}
            value={phoneNumberRegister}
            onChange={(e) => setPhoneNumberRegister(e.target.value)}
          ></Input>

          <Typography style={{ fontFamily: "Shabnam" }}> رمز عبور</Typography>
          <Input
            type="password"
            className={"uni_m_b_small"}
            value={passwordRegister}
            onChange={(e) => setPasswordRegister(e.target.value)}
          ></Input>
          <Typography style={{ fontFamily: "Shabnam" }}>
            تکرار رمز عبور
          </Typography>
          <Input
            type="password"
            className={"uni_m_b_small"}
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          ></Input>
          <Button
            variant={"contained"}
            color="primary"
            style={{ fontFamily: "Shabnam" }}
            onClick={handleRegister}
          >
            ثبت نام
          </Button>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
