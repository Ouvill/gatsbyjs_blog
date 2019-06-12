import React from "react"
import { Link, graphql } from "gatsby"
import { Card } from "@material-ui/core"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import { IndexesQuery, MarkdownRemarkEdge } from "../graphqlTypes"

interface IndexesProps {
  data: IndexesQuery
  pageContext: {
    next: string
    previous: string
  }
}

const Indexes: React.FC<IndexesProps> = props => {
  const { data } = props
  const { previous, next } = props.pageContext
  const posts = data.allMarkdownRemark ? data.allMarkdownRemark.edges : []

  return (
    <div>
      <div>
        {posts.map(({ node }) => {
          if (node.frontmatter && node.fields && node.fields.slug) {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <Card key={node.fields.slug}>
                <Link to={node.fields.slug}>{title}</Link>
              </Card>
            )
          }
        })}
      </div>

      {previous != null && (
        <Link to={`/indexes/${previous}`}>前の10件 {previous}</Link>
      )}
      {next != null && <Link to={`/indexes/${next}`}>次の10件 {next}</Link>}
    </div>
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
      skip: $index
      limit: 10
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
          }
        }
      }
    }
  }
`
