import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles"

export const siteStyle = {
  backgroundColor: "#f5f5f5",
  maxWidth: 960,
}

const default_theme = createMuiTheme({
  palette: {
    primary: {
      main: "#f8bbd0",
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
