import { Grid, Hidden, Paper, Theme, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { graphql, Link, PageRendererProps } from "gatsby"
import React from "react"
import styled from "styled-components"
import Bio from "../components/Bio"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import Share from "../components/Share"

const MainPaper = styled(Paper)`
  max-width: 760px;
  padding: ${(props) => props.theme.spacing(2)}px;
  position: relative;
  margin: 0 auto;

  ${(props) => props.theme.breakpoints.down("sm")} {
    width: 100vw;
  }
`

const useStyles = makeStyles((theme: Theme) => ({
  sideMenu: {
    display: "flex",
    alignItems: "flex-end",
  },
}))

const BlogContents = styled.div`
  display: flex;
`

const TOC = styled(Paper)`
  max-width: 760px;
  margin: 0 ${(props) => props.theme.spacing(2)}px;
  padding: ${(props) => props.theme.spacing(2)}px;
  overflow-y: auto;

  ${(props) => props.theme.breakpoints.up("md")} {
    max-height: calc(90vh - 50px);
    position: sticky;
    top: 100px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.values.md}px) {
    margin: 0 auto ${(props) => props.theme.spacing(2)}px auto;
  }

  /* font-family: "serif"; */
  a {
    color: ${(props) => props.theme.palette.secondary.dark};
    &:hover {
      color: ${(props) => props.theme.palette.secondary.main};
    }
  }

  text-decoration: none;

  ul {
    padding: 0;
    list-style-type: none;
  }

  ul ul {
    padding: 0 ${(props) => props.theme.spacing(2)}px;
  }

  li {
    margin-top: 0.6em;
  }
`

const Article = styled.div`
  width: 100%;
  line-height: 1.6;
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

  code[class*="language-"] {
  }
`

const Img = styled.img`
  position: sticky;
  bottom: 5%;
  width: 50%;
  max-height: 40%;
  opacity: 0.3;
  margin: 0 auto;

  /* background-image: url("/cherry-blossom-large.svg");
  background-repeat: no-repeat;
  background-position-y: 100px; */
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
  data: Queries.StaticPageQuery
  pageContext: {
    previous?: NavNove
    next?: NavNove
  }
}

const BlogPostTemplate: React.FC<BlogPostTemplateProps> = (props) => {
  const classes = useStyles()
  const post = props.data.markdownRemark
  const siteTitle = props.data.site!.siteMetadata!.title || ""
  const { previous, next } = props.pageContext

  const genFullPath = () => {
    if (
      props.data.site &&
      props.data.site.siteMetadata &&
      props.data.site.siteMetadata.siteUrl &&
      props.data.markdownRemark &&
      props.data.markdownRemark.fields &&
      props.data.markdownRemark.fields.slug
    ) {
      return (
        props.data.site.siteMetadata.siteUrl +
        props.data.markdownRemark.fields.slug
      )
    } else {
      return ""
    }
  }

  const fullPath = genFullPath()

  if (post && post.frontmatter) {
    return (
      <Layout location={props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title ? post.frontmatter.title : "unnamed"}
          description={post.frontmatter.description || post.excerpt}
        />
        <Grid container direction="row-reverse" justify="space-around">
          <Grid item xs={12} md={4} lg={3}>
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
          <Grid item xs={12} md={8} lg={6}>
            <MainPaper>
              <h1>{post.frontmatter.title}</h1>
              <p
                style={{
                  display: `block`,
                }}
              >
                {post.frontmatter.date}
              </p>
              {post.html ? (
                <Article>
                  <div dangerouslySetInnerHTML={{ __html: post.html }} />
                </Article>
              ) : (
                <div>記事データがありません</div>
              )}
              <hr style={{}} />

              <Share
                title={`${
                  post.frontmatter.title && post.frontmatter.title
                } | ${siteTitle}`}
                url={fullPath}
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
            </MainPaper>
          </Grid>
          <Grid item xs={12} lg={3} className={classes.sideMenu}>
            <Hidden mdDown>
              <Img src="/cherry-blossom-large.svg"></Img>
            </Hidden>
          </Grid>
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
  query StaticPage($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
      }
    }

    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      fields {
        slug
      }
      html
      htmlAst
      tableOfContents
      frontmatter {
        title
        date(formatString: "YYYY/MM/DD,")
        description
      }
    }
  }
`
