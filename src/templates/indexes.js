import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

const Indexes = props => {
  const { data } = props
  const { previous, next } = props.pageContext
  const posts = data.allMarkdownRemark.edges

  return (
    <div>
      <ul>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return <li key={node.fields.slug}>{title}</li>
        })}
      </ul>
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
