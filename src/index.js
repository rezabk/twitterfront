import { ThemeProvider } from "@mui/private-theming";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import Theme from "./components/theme/index";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <ThemeProvider theme={Theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById("root")
);
