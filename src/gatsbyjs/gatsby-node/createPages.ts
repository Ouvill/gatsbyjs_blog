import { GatsbyNode, CreatePagesArgs } from "gatsby"
import path from "path"
import { createRedirects } from "./redirect"

type CreatePageSubFunction = {
  graphql: CreatePagesArgs["graphql"]
  createPage: CreatePagesArgs["actions"]["createPage"]
}

const createIndexPage = ({ graphql, createPage }: CreatePageSubFunction) => {
  const indexPage = path.resolve("./src/templates/indexes.tsx")
  const listNum = 12
  //
  return graphql(`
    query CreateIndexPage {
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

export const createStaticPages = ({
  graphql,
  createPage,
}: CreatePageSubFunction) => {
  const blogPost = path.resolve(`./src/templates/StaticPage.tsx`)
  return graphql(`
    query CreateStaticPage {
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
  })
}

const createBlogPosts = ({ graphql, createPage }: CreatePageSubFunction) => {
  const blogPost = path.resolve(`./src/templates/BlogPost.tsx`)
  return graphql(`
    query CreateBlogPost {
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
  })
}

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage, createRedirect } = actions

  await createIndexPage({ graphql, createPage })
  await createBlogPosts({ graphql, createPage })
  await createStaticPages({ graphql, createPage })
  await createRedirects({ createRedirect })
}
