import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles"

const default_theme = createMuiTheme({})
export const theme = responsiveFontSizes(default_theme)
