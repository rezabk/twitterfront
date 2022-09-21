import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  header: {
    padding: 18,
    backgroundColor: "white",
    display: "flex",
  },
  headerTitle: {
    fontSize: "1.2rem !important",
    fontFamily: "Shabnam !important",
    marginRight: "0.5rem !important",
  },
  newTweet: {
    padding: 18,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
  },
  tweetItem: {
    padding: 18,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    marginTop: "0.5rem",
  },
  tweetBtn: {
    color: "white !important",
    borderRadius: "1rem !important",
    minHeight: "30px !important",
    height: "30px !important",
    fontFamily: "Shabnam !important",
    lineHeight: "1rem !important",
    minWidth: "5rem !important",
  },
  newTweetImg: {
    width: "93% ",
    border: "0.5px solid #3337",
    padding: "0.3rem",
    borderRadius: "50%",
    marginLeft: "0.75rem",
    marginTop: "-0.5rem",
  },
  tweetItemName: {
    fontWeight: "600 !important",
    fontFamily: "Shabnam !important",
  },
  tweetItemId: {
    fontSize: "0.9rem !important",
    color: theme.palette.text.hint,
    fontFamily: "Shabnam !important",
    marginRight: "0.5rem !important",
    paddingTop: "0.2rem !important",
  },
  tweetText: {
    fontSize: "0.9rem !important",
    marginTop: "0.75rem !important",
    fontFamily: "Shabnam !important",
  },
  liked: {
    color: "red !important",
  },
  likeCount: {
    fontSize: "1.1rem !important",
    color: theme.palette.text.hint,
  },
  tweetImg: {
    width: " 10rem",
    height: "10rem",
    marginTop: "1rem",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  },
  input: {
    marginRight: "1rem",
    fontFamily: "Shabnam !important",
    border: "none",
    flex: 1,
    "&:focus": {
      outline: "unset",
    },
    
  },
}));

export default useStyles;
