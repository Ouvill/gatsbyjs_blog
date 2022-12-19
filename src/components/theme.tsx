import { createTheme } from "@material-ui/core/styles"

export const siteStyle = {
  backgroundColor: "#f5f5f5",
  maxWidth: 960,
}

const default_theme = createTheme({
  palette: {
    primary: {
      main: "#F48FB1",
    },
    secondary: {
      main: "#8BC34A",
    },
    text: {
      primary: "#333333",
    },
  },
})

export const theme = default_theme
