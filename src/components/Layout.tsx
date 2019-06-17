import React, { useEffect } from "react"
import { Link, PageRendererProps } from "gatsby"
import {
  ThemeProvider as MaterialThemeProvider,
  StylesProvider,
} from "@material-ui/styles"
import { theme, siteStyle } from "./theme"
import { Typography, Theme, makeStyles } from "@material-ui/core"
import { relative } from "path"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"
import Footer from "./Footer"
import Fade from "./PoseFade"

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }

  a {
    color: ${props => props.theme.palette.secondary.dark};
    &:hover {
       color: ${props => props.theme.palette.secondary.main}
      }
    }
  }
`

const Header = styled.header`
  position: relative;
  z-index: 0;
  height: 320px;
  color: ${props => props.theme.palette.text.primary};
  background: ${props => props.theme.palette.primary.main};
`

const InnerHeader = styled.div`
  color: white;
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &:before {
    position: absolute;
    bottom: -100px;
    left: 0;
    right: 0;
    height: 100px;
    content: "";
    background-color: ${props => props.theme.palette.primary.main};
  }
`

const Main = styled.main`
  position: relative;
  z-index: 1;
`

const Root = styled.div`
  position: relative;
  width: "100%";
  min-height: "100vh";
  background-color: ${props => props.theme.palette.background.default};
`

const useStyle = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: theme.palette.background.default,
  },

  main: {
    display: "relative",
    marginLeft: `auto`,
    marginRight: `auto`,
  },

  title: {
    textAlign: "center",
  },
}))

interface LayoutProps extends PageRendererProps {
  title: string
}

const Layout: React.FC<LayoutProps> = props => {
  const classes = useStyle()
  const { location, title, children } = props
  const rootPath = `/`
  let header

  if (location.pathname === rootPath || location.pathname.match(/indexes/)) {
    header = (
      <InnerHeader>
        <Typography
          className={classes.title}
          style={{
            marginTop: "48px",
          }}
          variant="h4"
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
      </InnerHeader>
    )
  } else {
    header = (
      <InnerHeader>
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
      </InnerHeader>
    )
  }
  return (
    <StylesProvider injectFirst>
      <MaterialThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <Root className={classes.root}>
            <GlobalStyle />
            <Header>{header}</Header>
            <Main>
              <Fade location={location.pathname}>{children}</Fade>
            </Main>
            <Footer></Footer>
          </Root>
        </ThemeProvider>
      </MaterialThemeProvider>
    </StylesProvider>
  )
}

export default Layout
