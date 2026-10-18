import { createTheme } from "@mui/material/styles";

export const sidebarWidth = 240;

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#b8de83", contrastText: "#1b2b10" },
    secondary: { main: "#b9c8ed" },
    background: { default: "#101414", paper: "#191e1d" },
    text: { primary: "#e3e8e1", secondary: "#a9b3aa" },
    divider: "#343c35",
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h3: { fontWeight: 700, letterSpacing: "-0.035em" },
    h4: { fontWeight: 600, letterSpacing: "-0.025em" },
    h5: { fontWeight: 500 },
    button: { textTransform: "none", fontWeight: 500 },
    overline: { letterSpacing: "0.14em", fontSize: "0.65rem" },
  },
  shape: { borderRadius: 16 },
  // Component behavior and palette stay in MUI; visual overrides use Tailwind.
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        className: "rounded-3xl px-[22px]",
      },
    },
    MuiCard: { defaultProps: { elevation: 0, className: "bg-none" } },
    MuiPaper: { defaultProps: { className: "bg-none" } },
    MuiListItemButton: {
      defaultProps: {
        className:
          "mb-1 rounded-[28px] [&.Mui-selected]:bg-[#32482b] [&.Mui-selected]:text-[#d2edbd]",
      },
    },
  },
});
