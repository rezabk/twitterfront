import { autocompleteClasses } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    width: "18%",
    padding: "1.5rem 1rem",
    overflowY: "auto",
  },
  logoType: {
    fontFamily: "Shabnam !important",
    fontSize: "1.25rem !important",
    fontWeight: 600,
    marginRight: "1rem !important",
    color: theme.palette.primary.main,
  },
  userTitle: {
    fontFamily: "Shabnam !important",
    fontSize: "1.2rem !important",
    fontWeight: 600,
    marginTop: "2rem !important",
    marginBottom: ".5rem !important",
  },
  hashtag: {
    fontFamily: "Shabnam !important",
    marginRight: "0.8rem !important",
  },
  hashTagParent: {
    marginBottom: "0.5rem !important",
    padding: "0.15rem !important",
  },
  box: {
    border: "1px solid black",
    borderRadius: "2.5rem !important",
    width: "80%",
   height:"300px",
    background: "#f5f8fa",
  },
  inputLabels: {
    fontFamily: "Shabnam !important",
  },

  submitButton:{
    fontFamily: "Shabnam !important",
    marginLeft: "5% !important",
    marginTop: "4% !important",
    width: "20% !important",
    height: "10% !important",
  },
  userTweetsButton :{
    fontFamily: "Shabnam !important",
    marginTop: "20% !important",
    width:"100% !important"
  }
}));

export default useStyles;
