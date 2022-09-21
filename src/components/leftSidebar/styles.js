import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    width: "25%",
    padding: "1.5rem 2rem",
    overflowY: "auto",
  },
  profText: {
    fontFamily: "Shabnam !important",
    marginLeft: "0.5rem !important",
    width: "max-content !important",
    direction: "ltr",
  },
  tweeterNameParent: {
    marginRight: "0.5rem !important",
    width: "max-content !important",
  },
  profName: {
    flex: 1,
    fontFamily: "Shabnam !important",
  },
  profId: {
    flex: 1,
    fontFamily: "Shabnam !important",
    color: theme.palette.text.hint,
    fontSize: "0.8rem !important",
  },
  tweeterRoot: {
    background: "#f5f8fa",
    marginTop: "3rem !important",
    borderRadius: "2.5rem !important",
    padding: "11px 24px !important",
  },
  tweeterTitle: {
    fontFamily: "Shabnam !important",
    fontSize: "1.2rem !important",
    marginBottom: "11px !important",
  },
  tweeterParent: {
    padding: "10px 0px !important",
  },
}));

export default useStyles;
