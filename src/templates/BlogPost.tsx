import React from "react"
import { Link, graphql, PageRendererProps } from "gatsby"
import unified from "unified"
import rehypeReact from "rehype-react"

import Bio from "../components/Bio"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import { BlogPostBySlugQuery, MarkdownRemarkEdge } from "../graphqlTypes"
import { Paper, Theme, Box, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import styled from "styled-components"
import Counter from "../components/Counter"

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { "interactive-counter": Counter },
}).Compiler

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    maxWidth: "760px",
    padding: "16px",
    position: "relative",
    margin: "0 auto",
  },
}))

const BlogContents = styled.div`
  display: flex;
`

const TOC = styled(Paper)`
  max-height: calc(80vh - 100px);
  position: sticky;
  top: 100px;
  padding: ${props => props.theme.spacing(3)}px;
  overflow-y: auto;

  * {
    font-family: "serif";
    color: blue;
  }
`

interface NavNove {
  fields: {
    slug: string
  }
  frontmatter: {
    title: string
  }
}

interface BlogPostTemplateProps extends PageRendererProps {
  data: BlogPostBySlugQuery
  pageContext: {
    previous?: NavNove
    next?: NavNove
  }
}

const BlogPostTemplate: React.FC<BlogPostTemplateProps> = props => {
  const classes = useStyles()
  const post = props.data.markdownRemark
  const siteTitle = props.data.site!.siteMetadata!.title || ""
  const { previous, next } = props.pageContext

  if (post && post.frontmatter) {
    return (
      <Layout location={props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title ? post.frontmatter.title : "unnamed"}
          description={post.frontmatter.description || post.excerpt}
        />
        <Grid container direction="row-reverse" justify="space-around">
          <Grid item md={3}>
            <TOC>
              {props.data.markdownRemark!.tableOfContents && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: props.data.markdownRemark!.tableOfContents,
                  }}
                />
              )}
            </TOC>
          </Grid>
          <Grid item md={6}>
            <Paper className={classes.paper}>
              <h1>{post.frontmatter.title}</h1>
              <p
                style={{
                  display: `block`,
                }}
              >
                {post.frontmatter.date}
              </p>
              {renderAst(post.htmlAst)}
              {/* <div dangerouslySetInnerHTML={{ __html: post.html }} /> */}
              <hr style={{}} />
              <Bio />

              <ul
                style={{
                  display: `flex`,
                  flexWrap: `wrap`,
                  justifyContent: `space-between`,
                  listStyle: `none`,
                  padding: 0,
                }}
              >
                <li>
                  {next && (
                    <Link to={next.fields.slug} rel="next">
                      ← {next.frontmatter.title}
                    </Link>
                  )}
                </li>
                <li>
                  {previous && (
                    <Link to={previous.fields.slug} rel="prev">
                      {previous.frontmatter.title} →
                    </Link>
                  )}
                </li>
              </ul>
            </Paper>
          </Grid>
          <Grid item md={3}></Grid>
        </Grid>
      </Layout>
    )
  } else {
    return (
      <Layout location={props.location} title={siteTitle}>
        <div>post data error</div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      htmlAst
      tableOfContents
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
