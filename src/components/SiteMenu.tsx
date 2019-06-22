import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { Mail } from "styled-icons/feather/Mail"
import { Blog } from "styled-icons/icomoon/Blog"
import { theme } from "./theme"

const List = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: flex-end;
  margin: 0 ${props => props.theme.spacing(2)}px;
  width: auto;
  a {
    text-decoration: none;
    color: white;
    font-weight: 600;
    transition: all 400ms 0s ease;
    &:hover {
      opacity: 0.7;
    }
  }
`

const ListItem = styled.li`
  display: flex;
  align-items: center;
  margin-left: ${props => props.theme.spacing(2)}px;
`

const Icon = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 4px;
`

interface MenuProps {
  className?: string
}
const SiteMenu: React.FC<MenuProps> = ({ className }) => {
  return (
    <List className={className}>
      <Link to="/">
        <ListItem>
          <Icon>
            <Blog />
          </Icon>
          <p>ブログ</p>
        </ListItem>
      </Link>
      <Link to="/contact">
        <ListItem>
          <Icon>
            <Mail />
          </Icon>
          <p>お問い合わせ</p>
        </ListItem>
      </Link>
    </List>
  )
}

export default SiteMenu
