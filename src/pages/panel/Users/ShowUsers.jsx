import React, { useState, useEffect } from "react";
import { isEmpty } from "lodash";
import { showUsers } from "../../../api/AdminServices";
import { toast } from "react-toastify";
import "@reach/dialog/styles.css";

const ShowUsers = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    handleGetUsers();
  }, []);

  const handleGetUsers = async () => {
    try {
      const { status, data } = await showUsers();
      console.log(data);
      if (status === 200) {
        setUsers(data.result);
      }
    } catch (ex) {
      console.log(ex);
      toast.error("Error occured");
    }
  };

  return (
    <div
      className="courses-section my-5"
      style={{ marginTop: "-3em", marginRight: "15em" }}
    >
      <div style={{ marginTop: "-1000px" }}>
        <h3 className="alert alert-info text-center">Users</h3>

        <table class="table">
          <thead>
            <tr>
              <th scope="col"> userId</th>
              <th scope="col"> FullName </th>

              <th scope="col">Email </th>

              <th scope="col">Total Balance </th>
              <th scope="col"> Locked Balance</th>
              <th scope="col">Withdrawble</th>
              <th scope="col"> Total Earning</th>
              <th scope="col"> Referal </th>
              <th scope="col"> Total Task </th>
            </tr>
          </thead>
          <tbody>
            {!isEmpty(users)
              ? users.map((user) => (
                  <tr>
                    <td>{!isEmpty(user) ? user.id : null} </td>
                    <td>{!isEmpty(user) ? user.fullName : null} </td>

                    <td>{!isEmpty(user) ? user.email : null} </td>

                    <td>{!isEmpty(user) ? user.totalBalance : null} </td>
                    <td>{!isEmpty(user) ? user.lockedBalance : null} </td>
                    <td>{!isEmpty(user) ? user.withdrawbleBalance : null} </td>
                    <td>{!isEmpty(user) ? user.totalEarning : null} </td>
                    <td>{!isEmpty(user) ? user.referalCommission : null} </td>
                    <td>{!isEmpty(user) ? user.totalTaskDone : null} </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowUsers;
