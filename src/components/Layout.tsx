import React from "react"
import { Link, PageRendererProps } from "gatsby"
import { rhythm, scale } from "../utils/typography"
import { ThemeProvider } from "@material-ui/styles"
import { theme } from "./theme"
import { Typography } from "@material-ui/core"

interface LayoutProps extends PageRendererProps {
  title: string
}

class Layout extends React.Component<LayoutProps> {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath || location.pathname.match(/indexes/)) {
      header = (
        <Typography
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </Typography>
      )
    } else {
      header = (
        <Typography
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </Typography>
      )
    }
    return (
      <ThemeProvider theme={theme}>
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(24),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          <header>{header}</header>
          <main>{children}</main>
          <footer>
            Â© {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      </ThemeProvider>
    )
  }
}

export default Layout
