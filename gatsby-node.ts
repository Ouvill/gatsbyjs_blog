import { GatsbyNode } from "gatsby"
import { createFilePath } from "gatsby-source-filesystem"
import webpack from "webpack"
export { createPages } from "./src/gatsbyjs/gatsby-node/createPages"

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
