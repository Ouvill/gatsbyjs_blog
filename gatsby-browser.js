import "normalize.css"

// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"
// import "prismjs/themes/prism.css"
import "prismjs/themes/prism-solarizedlight.css"
import React from "react"

import posed, { PoseGroup } from "react-pose"

const Transition = posed.div({
  // enter: { opacity: 1, delay: 300, beforeChildren: true },
  // exit: { opacity: 0 },
})

export const wrapPageElement = ({ props, element }) => {
  return (
    <PoseGroup>
      <Transition key={props.location.pathname}>
        {element}
      </Transition>
    </PoseGroup>
  )
}
