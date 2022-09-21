import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Typography } from "@mui/material";
import useStyles from "./styles";

const Header = ({ title, icon }) => {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      {icon}
      <Typography className={classes.headerTitle}>{title}</Typography>{" "}
    </div>
  );
};

<div>خانه</div>;
export default Header;
