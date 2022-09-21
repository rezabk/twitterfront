import React, { useEffect } from "react";
import Layout from "./layout/Layout";
import Home from "./../pages/home/Home";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import NotFound from "./../pages/404/404";
import TweetByHashTag from "./../pages/tweetsByHashTag/TweetByHashTag";
import TweetByUser from "./../pages/tweetsByUser/TweetByUser";
import AuthPage from "./../pages/auth/AuthPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TweetProvider } from "../context/TweetContext";
import { isEmpty } from "lodash";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <PublicRoute path="/login" component={AuthPage} />
          <PrivateRoute
            path="/"
            render={() => (
              <TweetProvider>
                <Layout>
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route
                      path="/hashtags/:hashtag"
                      component={TweetByHashTag}
                    />
                    <Route path="/users/:name" component={TweetByUser} />
                    <Route component={NotFound} />
                  </Switch>
                </Layout>
              </TweetProvider>
            )}
          />
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
        if (isLogin()) return <Redirect to={"/"} />;
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
