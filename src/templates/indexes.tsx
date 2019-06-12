import React from "react"
import { Link, graphql, PageRendererProps } from "gatsby"
import Img, { FluidObject } from "gatsby-image"
import { Card, Typography, Grid } from "@material-ui/core"
import Bio from "../components/bio"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import {
  IndexesQuery,
  MarkdownRemarkEdge,
  ImageSharpFluid,
} from "../graphqlTypes"

interface IndexesProps extends PageRendererProps {
  data: IndexesQuery
  pageContext: {
    next: string
    previous: string
  }
}

const Indexes: React.FC<IndexesProps> = props => {
  const { data } = props
  const { previous, next } = props.pageContext
  const siteTitle =
    (data.site && data.site.siteMetadata && data.site.siteMetadata.title) || ""
  const posts = data.allMarkdownRemark ? data.allMarkdownRemark.edges : []

  return (
    <Layout location={props.location} title={siteTitle}>
      <Grid container>
        {posts.map(({ node }) => {
          if (node.frontmatter && node.fields && node.fields.slug) {
            const title = node.frontmatter.title || node.fields.slug
            const excerpt = node.excerpt
            const coverImg =
              node.frontmatter.cover &&
              node.frontmatter.cover.childImageSharp &&
              node.frontmatter.cover.childImageSharp.fluid
            return (
              <Card key={node.fields.slug}>
                {coverImg && (
                  <Img fluid={coverImg as FluidObject} alt="cover image"></Img>
                )}
                <Typography>
                  <Link to={node.fields.slug}>{title}</Link>
                </Typography>
                <Typography>{excerpt}</Typography>
                <Typography></Typography>
              </Card>
            )
          }
        })}
      </Grid>

      <div>
        {previous != null && (
          <Link to={`/indexes/${previous}`}>前の10件 {previous}</Link>
        )}
        {next != null && <Link to={`/indexes/${next}`}>次の10件 {next}</Link>}
      </div>
    </Layout>
  )
}

export default Indexes

export const pageQuery = graphql`
  query Indexes($index: Int!) {
    site {
      siteMetadata {
        title
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
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
