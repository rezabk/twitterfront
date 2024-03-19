import { Link } from "react-router-dom";
import TopNav from "../TopNav/TopNav";
import "./Dashboard.css";
import Sidebar from "../Sidebar/Sidebar";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import UserDetails from "../UserDetails/UserDetails";
import Books from "../Books/Books";
import BookByName from "../Books/BookByName";
import BooksByWriterName from "../Books/BooksByWriterName";
import { GetBookByCategory } from "../../../api/Books";
import BooksByCategory from "../Books/BooksByCategory";
import ReservedBooks from "../Books/ReservedBooks";
import Charges from "../Charges/Charges";

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
        <Route path="/panel/userdetails" component={UserDetails} />
        <Route path="/panel/books" component={Books} />
        <Route path="/panel/reservedBooks" component={ReservedBooks} />
        <Route path="/panel/bookbyname" component={BookByName} />
        <Route path="/panel/bookbywritername" component={BooksByWriterName} />
        <Route path="/panel/bookbycategory" component={BooksByCategory} />
        <Route path="/panel/charges" component={Charges} />
      </Switch>
    </div>
  );
};

export default Dashboard;
