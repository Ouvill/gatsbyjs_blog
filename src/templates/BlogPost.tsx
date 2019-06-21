import React from "react"
import { Link, graphql, PageRendererProps } from "gatsby"
import { TransitionState } from "gatsby-plugin-transition-link"
import unified from "unified"
import rehypeReact from "rehype-react"

import Bio from "../components/Bio"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import { BlogPostBySlugQuery, MarkdownRemarkEdge } from "../graphqlTypes"
import { Paper, Theme, Box, Grid, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import styled from "styled-components"
import Counter from "../components/Counter"
import Share from "../components/Share"

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

  margin: 0 ${props => props.theme.spacing(2)}px;
  @media (max-width: ${props => props.theme.breakpoints.values.md}px) {
    margin: 0 0 ${props => props.theme.spacing(2)}px 0;
  }

  padding: ${props => props.theme.spacing(3)}px;
  overflow-y: auto;

  /* font-family: "serif"; */
  a {
    color: ${props => props.theme.palette.secondary.dark};
    &:hover {
      color: ${props => props.theme.palette.secondary.main};
    }
  }

  text-decoration: none;

  ul {
    padding: 0;
    list-style-type: none;
  }

  ul ul {
    padding: 0 ${props => props.theme.spacing(2)}px;
  }
`

const Article = styled.div`
  .gatsby-highlight-code-line {
    background-color: #feb;
    display: block;
    margin-right: -1em;
    margin-left: -1em;
    padding-right: 1em;
    padding-left: 0.75em;
    border-left: 0.25em solid #f99;
  }

  /**
 * Add back the container background-color, border-radius, padding, margin
 * and overflow that we removed from <pre>.
 */
  .gatsby-highlight {
    background-color: #fdf6e3;
    border-radius: 0.3em;
    margin: 0.5em 0;
    padding: 1em;
    overflow: auto;
  }

  /**
 * Remove the default PrismJS theme background-color, border-radius, margin,
 * padding and overflow.
 * 1. Make the element just wide enough to fit its content.
 * 2. Always fill the visible space in .gatsby-highlight.
 * 3. Adjust the position of the line numbers
 */
  .gatsby-highlight pre[class*="language-"] {
    background-color: transparent;
    margin: 0;
    padding: 0;
    overflow: initial;
    float: left; /* 1 */
    min-width: 100%; /* 2 */
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
          <Grid item xs={12} md={3}>
            <TOC>
              <Typography>目次</Typography>
              {props.data.markdownRemark!.tableOfContents && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: props.data.markdownRemark!.tableOfContents,
                  }}
                />
              )}
            </TOC>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <h1>{post.frontmatter.title}</h1>
              <p
                style={{
                  display: `block`,
                }}
              >
                {post.frontmatter.date}
              </p>
              {/* {renderAst(post.htmlAst)} */}
              {post.html ? (
                <Article>
                  <div dangerouslySetInnerHTML={{ __html: post.html }} />
                </Article>
              ) : (
                <div>記事データがありません</div>
              )}
              <hr style={{}} />

              <Share
                title={`${post.frontmatter.title &&
                  post.frontmatter.title} | ${siteTitle}`}
                url={location.href}
              ></Share>

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
          <Grid item xs={12} md={3}></Grid>
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
      html
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
