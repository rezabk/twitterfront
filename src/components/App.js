import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import NotFound from "./../pages/404/404";
import AuthPage from "./../pages/auth/AuthPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "../pages/panel/Dashboard/Dashboard";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <PublicRoute path="/login" component={AuthPage} />
          <PrivateRoute path="/" render={Dashboard} />
        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

const isLogin = () => !!localStorage.getItem("x-auth-token");

const PublicRoute = ({ component, ...props }) => {
  return (
    <Route
      {...props}
      render={(props) => {
        if (isLogin()) return <Redirect to={"/panel/users"} />;
        else {
          return React.createElement(component, props);
        }
      }}
    />
  );
};

const PrivateRoute = ({ render, ...props }) => {
  return (
    <Route
      {...props}
      render={(props) => {
        if (isLogin()) return render(props);
        else return <Redirect to={"/login"} />;
      }}
    />
  );
};

export default App;
