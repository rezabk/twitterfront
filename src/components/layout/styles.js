import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    height: "100vh",
    width: "100%",
    overflow: "hidden",
  },
  rightSidebar: {
    backgroundColor: "white",
    width: "18%",
  },
  leftSidebar: {
    backgroundColor: "white",
    width: "25%",
  },

  divider: {
    height: "100%",
    width: 1,
    backgroundColor: "#7EBAFF",
    filter: "opacity(0.5)",
  },
  waitParent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
  },
  content: {
    flex: 1,
    overflowY: "auto",
    backgroundColor: "white",
  },
});

export default useStyles;
