import { Link } from "react-router-dom";
import TopNav from "../TopNav/TopNav";
import "./Dashboard.css";
import Sidebar from "../Sidebar/Sidebar";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import ShowUsers from "../Users/ShowUsers";
import ChangePassword from "../Users/ChangePassword";
import Deposits from "../Users/Deposits";
const Dashboard = ({ children }) => {
  const handleLogOut = () => {
    localStorage.removeItem("x-auth-token");
    window.location.reload();
  };

  return (
    <div id="wrapper">
      <nav
        className="navbar navbar-inverse navbar-fixed-top dashboard-navbar"
        style={{ backgroundColor: "#222", height: "80px" }}
        role="navigation"
      >
        <div className="navbar-header dashboard-navbar-header">
          <Link
            className="navbar-brand dashboard-navbar-brand"
            style={{
              border: "none",
              color: "rgb(165, 165, 165)",
              transition: "0.5s",
              fontSize: "20px",
            }}
            to="/dashboard"
          ></Link>
        </div>
        <button
          class="btn btn-danger"
          style={{ fontFamily: "Shabnam", marginLeft: "5%" }}
          onClick={handleLogOut}
        >
          خروج
        </button>
        {/* <TopNav /> */}
      </nav>
      <Sidebar />

      <Switch>
        <Route path="/panel/users" component={ShowUsers} />
        <Route path="/panel/userchangepassword" component={ChangePassword} />
        <Route path="/panel/deposits" component={Deposits} />
      </Switch>
    </div>
  );
};

export default Dashboard;
