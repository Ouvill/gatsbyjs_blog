import React from "react"
import posed, { PoseGroup } from "react-pose"
import { TransitionState } from "gatsby-plugin-transition-link"

const PoseFade = posed.div({
  enter: {
    opacity: 1,
    delay: 100,
    // beforeChildren: true
  },
  exit: { opacity: 0 },
})

// interface FadeProps {}
// const Fade: React.FC<FadeProps> = props => {
//   return (
//     <TransitionState>
//       {({ transitionStatus }) => {
//         return (
//           <PoseFade
//             pose={
//               ["entering", "entered"].includes(transitionStatus)
//                 ? "visible"
//                 : "hidden"
//             }
//           >
//             {props.children}
//           </PoseFade>
//         )
//       }}
//     </TransitionState>
//   )
// }

interface FadeProps {
  location: string
}
const Fade: React.FC<FadeProps> = props => {
  return <PoseFade key={props.location}>{props.children}</PoseFade>
}

export default Fade
