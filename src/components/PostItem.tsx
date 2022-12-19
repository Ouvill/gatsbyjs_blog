import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core"
import { Link } from "gatsby"
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image"
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
  coverImg?: ImageDataLike | null
}
const PostItemCard: React.FC<PostItemProps> = ({
  coverImg,
  title,
  slug,
  className,
}) => {
  const image = coverImg ? getImage(coverImg) : undefined

  return (
    <StyledCard className={className}>
      <CardActionArea
        style={{ width: "100%", height: "100%" }}
        component={Link}
        to={slug}
      >
        {image && <GatsbyImage image={image} alt={`cover image`} />}
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
