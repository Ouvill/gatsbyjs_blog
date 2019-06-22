import "normalize.css"

// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"
import "prismjs/themes/prism.css"
import React from "react"

import posed, { PoseGroup } from "react-pose"

const Transition = posed.div({
  // enter: { opacity: 1, delay: 300, beforeChildren: true },
  // exit: { opacity: 0 },
})

export const replaceComponentRenderer = ({ props, ...other }) => {
  const { component } = props.pageResources
  return (
    <PoseGroup>
      <Transition key={props.location.pathname}>
        {React.createElement(component, props)}
      </Transition>
    </PoseGroup>
  )
}
