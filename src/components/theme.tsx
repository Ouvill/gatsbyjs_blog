import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles"

export const siteStyle = {
  maxWidth: 960,
}

const default_theme = createMuiTheme({
  palette: {
    text: {
      primary: "#333333",
    },
  },
})
export const theme = responsiveFontSizes(default_theme)
