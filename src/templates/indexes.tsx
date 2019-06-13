import React from "react"
import { Link, graphql, PageRendererProps } from "gatsby"
import Img, { FluidObject } from "gatsby-image"
import {
  Card,
  Typography,
  Grid,
  CardActionArea,
  CardMedia,
  Theme,
  Button,
  CardContent,
} from "@material-ui/core"
import Bio from "../components/Bio"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import {
  IndexesQuery,
  MarkdownRemarkEdge,
  ImageSharpFluid,
} from "../graphqlTypes"
import siteConfig from "../../gatsby-config"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    maxWidth: 320,
    height: "100%",
  },
  cardAction: {
    height: "100%",
    width: "100%",
  },
  link: {
    textDecoration: "none",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
  },
}))

interface IndexesProps extends PageRendererProps {
  data: IndexesQuery
  pageContext: {
    next: string
    previous: string
  }
}

const Indexes: React.FC<IndexesProps> = props => {
  const classes = useStyles()

  const { data } = props
  const { previous, next } = props.pageContext
  const siteTitle =
    (data.site && data.site.siteMetadata && data.site.siteMetadata.title) || ""
  const posts = data.allMarkdownRemark ? data.allMarkdownRemark.edges : []

  return (
    <Layout location={props.location} title={siteTitle}>
      <Grid container spacing={4} justify="center">
        {posts.map(({ node }) => {
          if (node.frontmatter && node.fields && node.fields.slug) {
            const title = node.frontmatter.title || node.fields.slug
            const excerpt = node.excerpt
            const coverImg =
              (node.frontmatter.cover &&
                node.frontmatter.cover.childImageSharp &&
                node.frontmatter.cover.childImageSharp.fluid) ||
              (data.file &&
                data.file.childImageSharp &&
                data.file.childImageSharp.fluid)
            return (
              <Grid item key={node.fields.slug} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardActionArea
                    className={classes.cardAction}
                    component={Link}
                    to={node.fields.slug}
                  >
                    {coverImg && (
                      <CardMedia
                        component={Img}
                        fluid={coverImg as FluidObject}
                        alt="cover image"
                      ></CardMedia>
                    )}
                    <CardContent>
                      <Typography variant="h6" component="h2">
                        {title}
                      </Typography>
                      {/* <Typography>{excerpt}</Typography> */}
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            )
          }
        })}
      </Grid>

      <div className={classes.nav}>
        <Button
          component={Link}
          to={`/indexes/${previous}`}
          disabled={previous == null ? true : false}
        >
          前の10件
        </Button>

        <Button
          component={Link}
          to={`/indexes/${next}`}
          disabled={next == null ? true : false}
        >
          次の10件
        </Button>
      </div>
    </Layout>
  )
}

export default Indexes

export const pageQuery = graphql`
  query Indexes($index: Int!, $defaultCover: String!) {
    file(absolutePath: { eq: $defaultCover }) {
      childImageSharp {
        fluid(maxWidth: 640, maxHeight: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/content/blog/" } }
      skip: $index
      limit: 9
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            cover {
              childImageSharp {
                fluid(maxWidth: 640, maxHeight: 400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
