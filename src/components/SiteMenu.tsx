import { Mail } from "@styled-icons/feather/Mail"
import { Blog } from "@styled-icons/icomoon/Blog"
import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"

const List = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: flex-end;
  margin: 0 ${(props) => props.theme.spacing(2)}px;
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
  margin-left: ${(props) => props.theme.spacing(2)}px;
`

const Icon = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 4px;
`

const Flex = styled.div`
  display: flex;
  align-items: center;

  transition: all 200ms 0s ease;

  &:hover {
    opacity: 0.8;
  }
`

interface MenuProps {
  className?: string
}
const SiteMenu: React.FC<MenuProps> = ({ className }) => {
  return (
    <List className={className}>
      <ListItem>
        <Link to="/">
          <Flex>
            <Icon>
              <Blog />
            </Icon>
            <p>ブログ</p>
          </Flex>
        </Link>
      </ListItem>
      <ListItem>
        <Link to="/contact">
          <Flex>
            <Icon>
              <Mail />
            </Icon>
            <p>お問い合わせ</p>
          </Flex>
        </Link>
      </ListItem>
    </List>
  )
}

export default SiteMenu
