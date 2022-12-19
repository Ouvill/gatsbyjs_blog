import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core"
import { Link } from "gatsby"
import Img, { FluidObject } from "gatsby-image"
import React from "react"
import styled from "styled-components"

const StyledCard = styled(Card)`
  max-width: 320px;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
`

const StyledCardActionArea = styled(CardActionArea)`
  height: 100%;
  width: 100%;
`

interface PostItemProps {
  slug: string
  title: string
  className?: string
  coverImg: FluidObject
}
const PostItemCard: React.FC<PostItemProps> = ({
  coverImg,
  title,
  slug,
  className,
}) => {
  return (
    <StyledCard className={className}>
      <CardActionArea
        style={{ width: "100%", height: "100%" }}
        component={Link}
        to={slug}
      >
        {coverImg && <Img fluid={coverImg} alt="cover image"></Img>}
        <CardContent>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          {/* <Typography>{excerpt}</Typography> */}
        </CardContent>
      </CardActionArea>
    </StyledCard>
  )
}

export default PostItemCard
