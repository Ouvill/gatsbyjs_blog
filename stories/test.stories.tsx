import React from "react"

import {
  storiesOf,
  addDecorator,
  StoryDecorator,
  RenderFunction,
} from "@storybook/react"
import Share from "../src/components/Share"
import { ThemeProvider } from "styled-components"
import { theme } from "../src/components/theme"

const themeDecorator: StoryDecorator = storyFn => (
  <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
)

addDecorator(themeDecorator)

storiesOf("Hello", module).add("World", () => <div>hello</div>)

storiesOf("share", module).add("default", () => (
  <Share title="title" url="sample.html"></Share>
))
