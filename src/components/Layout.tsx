import React from "react"
import { Link, PageRendererProps } from "gatsby"
import { rhythm, scale } from "../utils/typography"
import { ThemeProvider } from "@material-ui/styles"
import { theme, siteStyle } from "./theme"
import { Typography, Theme, makeStyles } from "@material-ui/core"

const useStyle = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: siteStyle.backgroundColor,
  },

  main: {
    maxWidth: siteStyle.maxWidth,
    marginLeft: `auto`,
    marginRight: `auto`,
  },
}))

interface LayoutProps extends PageRendererProps {
  title: string
}

const Layout: React.FC<LayoutProps> = props => {
  const classes = useStyle()
  const { location, title, children } = props
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
    <div className={classes.root}>
      <header>{header}</header>
      <main className={classes.main}>{children}</main>
      <footer>
        Â© {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
