import { createTheme } from "@mui/system";
import tinyColor from "tinycolor2";

const colorPrimary = "#5ea9dd";
const colorHint = "#808080";

const Theme = createTheme({
  palette: {
    primary: {
      main: colorPrimary,
      light: tinyColor(colorPrimary).lighten().toHexString,
    },
    text: {
      hint: colorHint,
    },
  },
});
export default Theme;
