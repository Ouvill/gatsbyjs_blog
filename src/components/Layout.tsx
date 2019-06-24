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
import SiteMenu from "./SiteMenu"

const GlobalStyle = createGlobalStyle`
  *, *:before, *:after {
    box-sizing:border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    scroll-behavior: smooth;
    }

  body {
    margin: 0;

  }

  a {
    transition: all 200ms 0s ease;
    color: ${props => props.theme.palette.secondary.dark};
    &:hover {
       color: ${props => props.theme.palette.secondary.main};
       opacity:0.8;

      }
    }
  }
`

const Header = styled.header`
  position: relative;
  z-index: 0;
  height: 320px;
  color: ${props => props.theme.palette.text.primary};
  background: ${props => props.theme.palette.primary.light};
`

const InnerHeader = styled.div`
  color: white;
  position: relative;
  height: 100%;
  width: 100%;

  &:before {
    position: absolute;
    bottom: -100px;
    left: 0;
    right: 0;
    height: 100px;
    content: "";
    background-color: ${props => props.theme.palette.primary.light};
  }
`

const Center = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Main = styled.main`
  position: relative;
  left: 0;
  right: 0;
  z-index: 1;
`

const Root = styled.div`
  position: relative;
  width: auto;
  min-height: 100vh;
  background-color: ${props => props.theme.palette.background.default};
`

const Content = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
`

const HeaderTop = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100;
`

const useStyle = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: theme.palette.background.default,
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
        <HeaderTop>
          <SiteMenu></SiteMenu>
        </HeaderTop>
        <Center>
          <Typography className={classes.title} variant="h4">
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
        </Center>
      </InnerHeader>
    )
  } else {
    header = (
      <InnerHeader>
        <HeaderTop>
          <SiteMenu></SiteMenu>
        </HeaderTop>
        <Center>
          <Typography
            style={{
              marginTop: 0,
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
        </Center>
      </InnerHeader>
    )
  }
  return (
    <StylesProvider injectFirst>
      <MaterialThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <Root className={classes.root}>
            <GlobalStyle />
            <Content>
              <Header>{header}</Header>
              <Main>
                <Fade>{children}</Fade>
              </Main>
              <Footer></Footer>
            </Content>
          </Root>
        </ThemeProvider>
      </MaterialThemeProvider>
    </StylesProvider>
  )
}

export default Layout
