import React from "react"

import {
  storiesOf,
  addDecorator,
  StoryDecorator,
  RenderFunction,
} from "@storybook/react"
import Share from "../src/components/Share"
import styled, { ThemeProvider } from "styled-components"
import { theme } from "../src/components/theme"
import SiteMenu from "../src/components/SiteMenu"

const themeDecorator: StoryDecorator = storyFn => (
  <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
)

addDecorator(themeDecorator)

storiesOf("Hello", module).add("World", () => <div>hello</div>)

storiesOf("share", module).add("default", () => (
  <Share title="title" url="sample.html"></Share>
))

const HeaderMock = styled.div`
  background: ${props => props.theme.palette.primary.light};
`
storiesOf("SiteMenu", module).add("default", () => (
  <HeaderMock>
    <SiteMenu></SiteMenu>
  </HeaderMock>
))
