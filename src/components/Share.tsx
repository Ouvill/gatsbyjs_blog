import React from "react"
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
  LineShareButton,
  LineIcon,
} from "react-share"
import styled from "styled-components"

const List = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  justify-content: center;
`

const ListItem = styled.li`
  list-style-type: none;
  width: 32px;
  margin: 8px;

  transition: all 200ms 0s ease;

  &:hover {
    opacity: 0.7;
    transform: scale(1.2);
    cursor: pointer;
  }

  div {
    width: auto;
  }
`

interface ShareProps {
  url: string
  title: string
  className?: string
}
const Share: React.FC<ShareProps> = ({ url, title, className }) => {
  return (
    <List className={className}>
      <ListItem>
        <TwitterShareButton url={url} title={title}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </ListItem>

      <ListItem>
        <FacebookShareButton url={url}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </ListItem>

      <ListItem>
        <LinkedinShareButton url={url}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </ListItem>

      <ListItem>
        <LineShareButton url={url}>
          <LineIcon size={32} round />
        </LineShareButton>
      </ListItem>

      <ListItem>
        <EmailShareButton url={url}>
          <EmailIcon size={32} round />
        </EmailShareButton>
      </ListItem>
    </List>
  )
}

export default Share
