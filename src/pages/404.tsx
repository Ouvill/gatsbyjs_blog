import React from "react"
import { graphql, PageRendererProps } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import { Paper } from "@material-ui/core"
import { NotFoundPageQuery } from "../graphqlTypes"

interface NotFountPageProps extends PageRendererProps {
  data: NotFoundPageQuery
}

class NotFoundPage extends React.Component<NotFountPageProps> {
  render() {
    const { data } = this.props
    const siteTitle = data!.site!.siteMetadata!.title || "no name"

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="404: Not Found" />
        <Paper>
          <h1>Not Found</h1>
          <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        </Paper>
      </Layout>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query NotFoundPage {
    site {
      siteMetadata {
        title
      }
    }
  }
`
