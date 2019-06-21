const { createFilePath } = require("gatsby-source-filesystem")
const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  await createBlogPosts(graphql, createPage)
  await createStaticPages(graphql, createPage)
  await createIndexPage(graphql, createPage)
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const filepath = node.fileAbsolutePath
    const reg = /content\/blog/
    if (reg.test(filepath)) {
      const value = createFilePath({ node, getNode })
      createNodeField({
        name: `slug`,
        node,
        value: `/blog${value}`,
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

function createIndexPage(graphql, createPage) {
  const indexPage = path.resolve("./src/templates/indexes.tsx")
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
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const total = result.data.allMarkdownRemark.totalCount
    const defaultCover = result.data.site.siteMetadata.defaultCover
    const pages = total / 9
    const rest = total % 9
    for (i = 0; i < pages; i++) {
      const next = (i === pages - 1 && rest) || i < pages - 1 ? i + 1 : null
      const previous = i === 0 ? null : i - 1
      if (i == 0) {
        createPage({
          path: "/",
          component: indexPage,
          context: {
            index: i * 9,
            defaultCover,
            previous,
            next,
          },
        })
      }

      createPage({
        path: `indexes/${i}`,
        component: indexPage,
        context: {
          index: i * 9,
          defaultCover,
          previous,
          next,
        },
      })
    }
  })
}

function createStaticPages(graphql, createPage) {
  const blogPost = path.resolve(`./src/templates/BlogPost.tsx`)
  return graphql(`
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/pages/" } }
        sort: { fields: [frontmatter___date], order: DESC }
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
  `).then(result => {
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

function createBlogPosts(graphql, createPage) {
  const blogPost = path.resolve(`./src/templates/BlogPost.tsx`)
  return graphql(`
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/blog/" } }
        sort: { fields: [frontmatter___date], order: DESC }
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
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }
    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges
    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node
      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })
    return null
  })
}
