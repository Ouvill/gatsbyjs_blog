import posed from "react-pose"

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

export default Fade
