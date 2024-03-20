import React, { useState, useEffect } from "react";

import jwt_decode from "jwt-decode";

import { NavLink, withRouter } from "react-router-dom";

const Sidebar = () => {
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
        <li style={{ marginTop: "20%" }}>
          <NavLink
            to={`/panel/users`}
            className="dashboard-text"
            activeClassName="dashboard-text-active"
            style={{
              color: "white",
              fontSize: "20px",
              textDecoration: "none",
              fontFamily: "shabnam",
            }}
          >
            <i className="fa fa-fw fa-graduation-cap"></i>کاربران
          </NavLink>
        </li>

        <li style={{ marginTop: "20%" }}>
          <NavLink
            to={`/panel/userchangepassword`}
            className="dashboard-text"
            activeClassName="dashboard-text-active"
            style={{
              color: "white",
              fontSize: "20px",
              textDecoration: "none",
              fontFamily: "shabnam",
            }}
          >
            <i className="fa fa-fw fa-graduation-cap"></i>عوض کردن رمز کاربر
          </NavLink>
        </li>

        <li style={{ marginTop: "20%" }}>
          <NavLink
            to={`/panel/vpn`}
            className="dashboard-text"
            activeClassName="dashboard-text-active"
            style={{
              color: "white",
              fontSize: "20px",
              textDecoration: "none",
              fontFamily: "shabnam",
            }}
          >
            <i className="fa fa-fw fa-graduation-cap"></i>Vpn
          </NavLink>
        </li>

        <li style={{ marginTop: "20%" }}>
          <NavLink
            to={`/panel/deposits`}
            className="dashboard-text"
            activeClassName="dashboard-text-active"
            style={{
              color: "white",
              fontSize: "20px",
              textDecoration: "none",
              fontFamily: "shabnam",
            }}
          >
            <i className="fa fa-fw fa-graduation-cap"></i> واریز ها
          </NavLink>
        </li>

        <li style={{ marginTop: "20%" }}>
          <NavLink
            to={`/panel/withdraws`}
            className="dashboard-text"
            activeClassName="dashboard-text-active"
            style={{
              color: "white",
              fontSize: "20px",
              textDecoration: "none",
              fontFamily: "shabnam",
            }}
          >
            <i className="fa fa-fw fa-graduation-cap"></i> برداشت ها
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(Sidebar);
