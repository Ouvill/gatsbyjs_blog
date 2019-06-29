import React from "react"
import posed, { PoseGroup } from "react-pose"
import { TransitionState } from "gatsby-plugin-transition-link"

const Fade = posed.div({
  enter: {
    opacity: 1,
    delay: 100,
    transition: { duration: 50 },
  },
  exit: {
    opacity: 0,
  },
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

// interface FadeProps {
//   key: React.Key
// }
// const Fade: React.FC<FadeProps> = props => {
//   return <PoseFade key={props.key}>{props.children}</PoseFade>
// }

export default Fade
