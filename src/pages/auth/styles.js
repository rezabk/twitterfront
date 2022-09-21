import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "white",
    width: "30rem",
    border: "3px solid black",
    margin: "10rem auto",
    display: "flex",
    flexDirection: "column",
  },
  headerText: {
    margin: "1rem",
    alignSelf: "center",
    fontFamily: "Shabnam !important",
  },
  tab: {
    flex: 1,
    fontFamily: "Shabnam !important",
  },
  containerInput: {
    padding: "1rem 0.8rem",
    display: "flex",
    flexDirection: "column",
  },
}));

export default useStyles;
