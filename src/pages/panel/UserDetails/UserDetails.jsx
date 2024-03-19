import React, { useState, useEffect } from "react";
import { isEmpty } from "lodash";
import jwt_decode from "jwt-decode";
import { GetUserById } from "../../../api/UserService";

const UserDetails = () => {
  const [user, setUser] = useState();

  const userToken = localStorage.getItem("x-auth-token");
  const decodedToken = jwt_decode(userToken);

  useEffect(async () => {
    await GetUserById(decodedToken.unique_name).then((res) => {
      setUser(res.data.result);
    });
  }, []);

  return (
    <div
      className="courses-section my-5"
      style={{ marginTop: "-3em", marginRight: "15em" }}
    >
      <div style={{ marginTop: "-1000px" }}>
        <h3 className="alert alert-info text-center">اطلاعات کاربر</h3>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">نام و نام خانوادگی</th>
              <th scope="col"> نوع کاربر</th>

              <th scope="col">شماره موبایل</th>

              <th scope="col">وضعیت کاربر</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{!isEmpty(user) ? user.fullName : null} </td>
              <td>{!isEmpty(user) ? user.role : null} </td>

              <td>{!isEmpty(user) ? user.phoneNumber : null} </td>
              <td>
                {!isEmpty(user)
                  ? user.isActive == true
                    ? "فعال"
                    : "غیرفعال"
                  : null}{" "}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDetails;
