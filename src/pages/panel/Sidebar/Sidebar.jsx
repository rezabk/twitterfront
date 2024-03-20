import React, { useState, useEffect } from "react";

import jwtDecode from "jwt-decode";

import { NavLink, withRouter } from "react-router-dom";
import { getUserById } from "../../../api/AdminServices";
import { isEmpty } from "lodash";

const Sidebar = () => {
  const token = localStorage.getItem("x-auth-token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.unique_name;

  const [user, setUser] = useState();

  const fetchUser = async () => {
    await getUserById(decodedToken.unique_name)
      .then((res) => {
        setUser(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUser();
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

        {!isEmpty(user) ? (
          user.email == "ecadmin@gmail.com" ? null : (
            <>
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
            </>
          )
        ) : null}

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
