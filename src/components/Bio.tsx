/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { BioQueryQuery } from "../graphqlTypes"
import Image, { FixedObject } from "gatsby-image"

const Bio: React.FC = () => {
  return (
    <StaticQuery
      query={bioQuery}
      render={(data: BioQueryQuery) => {
        if (data.site && data.site.siteMetadata) {
          const { author, social } = data.site.siteMetadata
          return (
            <div
              style={{
                display: `flex`,
              }}
            >
              {data.avatar && data.avatar.childImageSharp && (
                <Image
                  fixed={data.avatar.childImageSharp.fixed as FixedObject}
                  alt={author ? author : ""}
                  style={{
                    marginBottom: 0,
                    minWidth: 50,
                    borderRadius: `100%`,
                  }}
                  imgStyle={{
                    borderRadius: `50%`,
                  }}
                />
              )}
              <p>
                この記事は <strong>{author}</strong>{" "}
                が書きました。サイト作成や記事執筆のご依頼を賜っております。
                {` `}
                {social && social.twitter && (
                  <a href={`https://twitter.com/${social.twitter}`}>
                    Twitter でも呟いております。
                  </a>
                )}
              </p>
            </div>
          )
        } else {
          return <div>データがありません</div>
        }
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`

export default Bio
