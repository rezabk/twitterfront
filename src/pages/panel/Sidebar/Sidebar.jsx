import React, { useState, useEffect } from "react";
import { isEmpty } from "lodash";
import jwt_decode from "jwt-decode";
import {
  isCompositeComponentWithType,
  isElement,
} from "react-dom/cjs/react-dom-test-utils.production.min";
import { NavLink, withRouter } from "react-router-dom";
import { GetUserById } from "../../../api/UserService";

const Sidebar = () => {
  const [user, setUser] = useState();

  const userToken = localStorage.getItem("x-auth-token");
  const decodedToken = jwt_decode(userToken);

  useEffect(async () => {
    await GetUserById(decodedToken.unique_name).then((res) => {
      setUser(res.data.result);
    });
  }, []);

  return (
    <div>
      <ul
        className="nav navbar-nav side-nav dashboard-sidebar "
        style={{
          height: "1000px",
          width: "225px",
          backgroundColor: " #222",
          textAlign: "right",
          overflowY: "auto",
          marginTop: "-5px",
        }}
      >
        <li style={{ marginTop: "20px" }}>
          <NavLink
            to={`/panel/userdetails/`}
            className="dashboard-text"
            activeClassName="dashboard-text-active"
            style={{
              color: "white",
              fontSize: "20px",
              textDecoration: "none",
              fontFamily: "shabnam",
            }}
          >
            <i className="fa fa-fw fa-dashboard"></i> داشبورد
          </NavLink>
        </li>
        <li style={{ marginTop: "20%" }}>
          <NavLink
            to={`/panel/books`}
            className="dashboard-text"
            activeClassName="dashboard-text-active"
            style={{
              color: "white",
              fontSize: "20px",
              textDecoration: "none",
              fontFamily: "shabnam",
            }}
          >
            <i className="fa fa-fw fa-graduation-cap"></i>کتاب ها
          </NavLink>
        </li>

        <li style={{ marginTop: "20%" }}>
          <NavLink
            to={`/panel/reservedBooks`}
            className="dashboard-text"
            activeClassName="dashboard-text-active"
            style={{
              color: "white",
              fontSize: "20px",
              textDecoration: "none",
              fontFamily: "shabnam",
            }}
          >
            <i className="fa fa-fw fa-graduation-cap"></i>کتاب های رزرو شده
          </NavLink>
        </li>

        {!isEmpty(user) && user.role === "admin" ? (
          <li style={{ marginTop: "20%" }}>
            <NavLink
              to={`/panel/charges`}
              className="dashboard-text"
              activeClassName="dashboard-text-active"
              style={{
                color: "white",
                fontSize: "20px",
                textDecoration: "none",
                fontFamily: "shabnam",
              }}
            >
              <i className="fa fa-fw fa-graduation-cap"></i> جریمه ها
            </NavLink>
          </li>
        ) : null}

        <li style={{ marginTop: "20%" }}>
          <NavLink
            to={`/panel/bookbyname`}
            className="dashboard-text"
            activeClassName="dashboard-text-active"
            style={{
              color: "white",
              fontSize: "20px",
              textDecoration: "none",
              fontFamily: "shabnam",
            }}
          >
            <i className="fa fa-fw fa-graduation-cap"></i>کتاب بر اساس نام
          </NavLink>
        </li>
        <li style={{ marginTop: "20%" }}>
          <NavLink
            to={`/panel/bookbywritername`}
            className="dashboard-text"
            activeClassName="dashboard-text-active"
            style={{
              color: "white",
              fontSize: "20px",
              textDecoration: "none",
              fontFamily: "shabnam",
            }}
          >
            <i className="fa fa-fw fa-graduation-cap"></i>کتاب بر اساس نام
            نویسنده
          </NavLink>
        </li>

        <li style={{ marginTop: "20%" }}>
          <NavLink
            to={`/panel/bookbycategory`}
            className="dashboard-text"
            activeClassName="dashboard-text-active"
            style={{
              color: "white",
              fontSize: "20px",
              textDecoration: "none",
              fontFamily: "shabnam",
            }}
          >
            <i className="fa fa-fw fa-graduation-cap"></i>کتاب بر اساس دسته بندی
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(Sidebar);
