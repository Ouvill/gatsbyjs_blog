import React from "react"
import styled from "styled-components"

const StyledFooter = styled.footer`
  margin-top: ${props => props.theme.spacing(4)}px;
  min-height: ${props => props.theme.spacing(8)}px;
  background-color: ${props => props.theme.palette.primary.main};

  display: flex;

  color: white;

  a {
    color: white;
  }
`

interface FooterProps {}
const Footer: React.FC<FooterProps> = props => {
  return (
    <StyledFooter>
      <p>
        © {new Date().getFullYear()},Designed and Written by Ouvill ,Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </p>
    </StyledFooter>
  )
}

export default Footer
