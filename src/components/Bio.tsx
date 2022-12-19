/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import { graphql, Link, StaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"

const Bio: React.FC = () => {
  return (
    <StaticQuery
      query={bioQuery}
      render={(data: Queries.BioQueryQuery) => {
        if (data.site && data.site.siteMetadata) {
          const image = data.avatar?.childImageSharp
            ? getImage(data.avatar?.childImageSharp)
            : undefined
          const { author, social } = data.site.siteMetadata
          return (
            <div
              style={{
                display: `flex`,
                alignItems: "center",
              }}
            >
              {image && (
                <GatsbyImage
                  image={image}
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
        gatsbyImageData(width: 64, height: 64, formats: [AUTO, WEBP, AVIF])
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
