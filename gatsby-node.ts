import { GatsbyNode } from "gatsby"
import { createFilePath } from "gatsby-source-filesystem"
import path from "path"
import webpack from "webpack"

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({
  loaders,
  actions,
  getConfig,
}) => {
  const config = getConfig()
  config.plugins.push(
    new webpack.ProvidePlugin({
      React: "react",
    })
  )
  actions.replaceWebpackConfig(config)
}

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions }) => {
    const { createTypes } = actions
    createTypes(`
  type MarkdownRemarkFrontmatter @infer {
    cover: File @fileByRelativePath
  }

  type MarkdownRemark implements Node @infer {
    frontmatter: MarkdownRemarkFrontmatter
  }`)
  }

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions

  await createBlogPosts(graphql, createPage)
  await createStaticPages(graphql, createPage)
  await createIndexPage(graphql, createPage)
}

export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  actions,
  getNode,
}) => {
  const { createNodeField } = actions
  //
  if (node.internal.type === `MarkdownRemark`) {
    const filepath = node.fileAbsolutePath
    const reg = /content\/blog\/.*/
    if (reg.test(filepath)) {
      const value = createFilePath({ node, getNode })
      createNodeField({
        name: `slug`,
        node,
        value: `/blog${value}`,
      })
      //
      createNodeField({
        name: `githubURL`,
        node,
        value: `https://github.com/Ouvill/gatsbyjs_blog/tree/master/${
          reg.exec(filepath)[0]
        }`,
      })
    }
    if (filepath.match(/content\/pages/)) {
      const value = createFilePath({ node, getNode })
      createNodeField({
        name: `slug`,
        node,
        value: `/pages${value}`,
      })
    }
  }
}
//
function createIndexPage(graphql, createPage) {
  const indexPage = path.resolve("./src/templates/indexes.tsx")
  const listNum = 12
  //
  return graphql(`
    {
      site {
        siteMetadata {
          defaultCover
        }
      }
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/blog/" } }
      ) {
        totalCount
      }
    }
  `).then((result) => {
    if (result.errors) {
      throw result.errors
    }
    //
    const total = result.data.allMarkdownRemark.totalCount
    const defaultCover = result.data.site.siteMetadata.defaultCover
    const pages = total / listNum
    const rest = total % listNum
    for (let i = 0; i < pages; i++) {
      const next = (i === pages - 1 && rest) || i < pages - 1 ? i + 1 : null
      const previous = i === 0 ? null : i - 1
      if (i == 0) {
        createPage({
          path: "/",
          component: indexPage,
          context: {
            index: i * listNum,
            defaultCover,
            previous,
            next,
          },
        })
      }
      //
      createPage({
        path: `indexes/${i}`,
        component: indexPage,
        context: {
          index: i * listNum,
          defaultCover,
          previous,
          next,
        },
      })
    }
  })
}
//
function createStaticPages(graphql, createPage) {
  const blogPost = path.resolve(`./src/templates/StaticPage.tsx`)
  return graphql(`
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/pages/" } }
        sort: { frontmatter: { date: DESC } }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      console.log(result.errors)
      throw result.errors
    }
    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges
    posts.forEach((post, index) => {
      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
        },
      })
    })
    return null
  })
}
//
function createBlogPosts(graphql, createPage) {
  const blogPost = path.resolve(`./src/templates/BlogPost.tsx`)
  return graphql(`
    {
      site {
        siteMetadata {
          defaultCover
        }
      }
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/blog/" } }
        sort: { frontmatter: { date: DESC } }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      throw result.errors
    }
    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges
    const defaultCover = result.data.site.siteMetadata.defaultCover
    //
    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node
      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          defaultCover,
          previous,
          next,
        },
      })
    })
    return null
  })
}
