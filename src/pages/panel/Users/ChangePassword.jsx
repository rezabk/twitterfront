import React, { useState } from "react";
import { changePassword } from "../../../api/AdminServices";
import { toast } from "react-toastify";
export default function ChangePassword() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleChangePassword = async () => {
    const user = {
      email: email,
      password: password,
    };

    try {
      const { status, data } = await changePassword(user);
      console.log(data);
      if (status === 200) {
        toast.success("Password Changed");
        resetStates();
      }
    } catch (ex) {
      console.log(ex);
      toast.error("Error occured");
    }
  };

  const resetStates = () => {
    setPassword("");
    setEmail("");
  };

  return (
    <div
      className="courses-section my-5"
      style={{ marginTop: "-3em", marginRight: "15em" }}
    >
      <div style={{ marginTop: "-1000px" }}>
        <h3 className="alert alert-info text-center">Change Password</h3>
        <form class="row g-3">
          <div class="col-auto">
            <label for="staticEmail2" class="visually-hidden">
              Email
            </label>
            <input
              type="text"
              class="form-control"
              id="Email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div class="col-auto">
            <label for="password" class="visually-hidden">
              Password
            </label>
            <input
              type="text"
              class="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div class="col-auto">
            <button
              onClick={(e) => handleChangePassword(e)}
              type="button"
              class="btn btn-primary mb-3"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
