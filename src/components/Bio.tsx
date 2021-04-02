/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
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
                alignItems: "center",
              }}
            >
              {data.avatar && data.avatar.childImageSharp && (
                <Image
                  fixed={data.avatar.childImageSharp.fixed as FixedObject}
                  alt={author ? author : ""}
                  style={{
                    marginBottom: 0,
                    marginRight: "16px",
                    minWidth: 64,
                    borderRadius: `100%`,
                  }}
                  imgStyle={{
                    borderRadius: `50%`,
                  }}
                />
              )}
              <div>
                <p>
                  この記事は{author}
                  が書きました。IT関連の記事執筆やサイト作成や、ウェブアプリケーション開発の業務委託などのご依頼を賜っております。
                </p>
                <p>
                  ご要件がある方は<Link to="/contact">コンタクトフォーム</Link>
                  からご連絡ください。
                </p>
                <p>
                  {social && social.twitter && (
                    <a href={`https://twitter.com/${social.twitter}`}>
                      @Ouvill
                    </a>
                  )}
                </p>
              </div>
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
        fixed(width: 64, height: 64) {
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
