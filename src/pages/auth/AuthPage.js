import React, { useState } from "react";
import { Tab, Tabs, Typography, Input, Button } from "@mui/material";
import useStyles from "./styles";
import { toast } from "react-toastify";
import { loginApi, registerMyApi } from "./../../api/api_auth";
import { Login, Register } from "../../api/AuthService";
import axios from "axios";
import { ResetTvOutlined } from "@mui/icons-material";

const LOGIN_TAB_VALUE = 1;
const REGISTER_TAB_VALUE = 2;

const AuthPage = () => {
  const classes = useStyles();

  const [tab, setTab] = useState(LOGIN_TAB_VALUE);

  //login state
  const [usernameLogin, setUsernameLogin] = useState();
  const [passwordLogin, setPasswordLogin] = useState();

  //register state
  const [firstNameRegister, setFirstNameRegister] = useState();
  const [lastNameRegister, setLastNameRegister] = useState();
  const [usernameRegister, setUsernameRegister] = useState();
  const [emailRegister, setEmailRegister] = useState();
  const [phoneNumberRegister, setPhoneNumberRegister] = useState();
  const [passwordRegister, setPasswordRegister] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();

  const handleChangeTab = (e, newValue) => {
    setTab(newValue);
  };

  const validateLogin = (user) => {
    if (!user.UserNameOrEmail) return "باید حتما یوزرنیم خود را وارد کنید ";
    if (!user.Password) return "باید حتما پسوورد خود را وارد کنید ";
  };

  const validateRegister = (user) => {
    if (!user.FirstName) return "باید حتما نام کوچک خود را وارد کنید";
    if (!user.LastName) return "باید حتما نام خانوادگی خود را وارد کنید ";
    if (!user.UserName) return "باید حتما یوزرنیم خود را وارد کنید ";
    if (!user.Email) return "باید حتما ایمیل خود را وارد کنید ";
    if (!user.PhoneNumber) return "باید حتما شماره موبایل خود را وارد کنید ";
    if (!user.Password) return "باید حتما پسوورد خود را وارد کنید ";
    if (user.password !== user.passwordConfirmation)
      return "رمز ها باید مشابه باشند";
  };

  const handleRegister = async () => {
    const user = {
      FirstName: firstNameRegister,
      LastName: lastNameRegister,
      UserName: usernameRegister,
      Email: emailRegister,
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
    }
  };

  const handleLogin = async () => {
    const user = {
      UserNameOrEmail: usernameLogin,
      Password: passwordLogin,
    };
    const error = validateLogin(user);
    if (error) return toast.warn(error);

    const { status, data } = await Login(user);

    if (status == 202) {
      toast.success(data.messages[0]);
      localStorage.setItem("x-auth-token", data.result.accessToken);
      window.location.reload();
    }
  };

  return (
    <div className={classes.container}>
      <Typography className={classes.headerText}>
        خوش آمدید به توییتر ما
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
          <Typography style={{ fontFamily: "Shabnam" }}>نام کاربری</Typography>
          <Input
            className={"uni_m_b_small"}
            value={usernameLogin}
            onChange={(e) => setUsernameLogin(e.target.value)}
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
          <Typography style={{ fontFamily: "Shabnam" }}>نام</Typography>
          <Input
            className={"uni_m_b_small"}
            value={firstNameRegister}
            onChange={(e) => setFirstNameRegister(e.target.value)}
          ></Input>

          <Typography style={{ fontFamily: "Shabnam" }}>
            نام خانوادگی
          </Typography>
          <Input
            className={"uni_m_b_small"}
            value={lastNameRegister}
            onChange={(e) => setLastNameRegister(e.target.value)}
          ></Input>
          <Typography style={{ fontFamily: "Shabnam" }}>نام کاربری</Typography>
          <Input
            className={"uni_m_b_small"}
            value={usernameRegister}
            onChange={(e) => setUsernameRegister(e.target.value)}
          ></Input>

          <Typography style={{ fontFamily: "Shabnam" }}> ایمیل</Typography>
          <Input
            className={"uni_m_b_small"}
            value={emailRegister}
            onChange={(e) => setEmailRegister(e.target.value)}
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
