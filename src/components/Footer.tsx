import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const StyledFooter = styled.footer`
  margin-top: ${props => props.theme.spacing(4)}px;
  min-height: ${props => props.theme.spacing(8)}px;
  background-color: ${props => props.theme.palette.primary.main};

  display: flex;
  justify-content: flex-end;
  align-items: center;

  color: white;

  a {
    color: white;
  }

  & > * {
    margin: ${props => props.theme.spacing(2)}px;
  }
`

interface FooterProps {}
const Footer: React.FC<FooterProps> = props => {
  return (
    <StyledFooter>
      <p>
        <Link to="/pages/privacy_policy">プライバシーポリシー</Link>
      </p>
      <p>
        © {new Date().getFullYear()},Designed and Written by Ouvill ,Built with
        {` `}
        <a
          href="https://www.gatsbyjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gatsby
        </a>
      </p>
    </StyledFooter>
  )
}

export default Footer
