import { Typography } from "@mui/material";
import React, { useState } from "react";
import Dashboard from "./Dashboard/Dashboard";
import Sidebar from "./Sidebar/Sidebar";

import useStyles from "./styles";

const PanelPage = () => {
  const classes = useStyles();

  return (
    <div>
      <Dashboard />
      {/* <Sidebar /> */}
    </div>
  );
};

export default PanelPage;
