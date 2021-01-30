import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BackgroundImage from "gatsby-background-image"

import blogStyles from "../styles/blog.module.css"

const Tags = ({ pageContext, data, location }) => {
  const { tag } = pageContext
  const totalCount = data.allMarkdownRemark.totalCount
  const posts = data.allMarkdownRemark.edges
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  const headerText = `tags/${tag}`
  const subHeaderText = `${totalCount} post${totalCount === 1 ? "" : "s"}`

  return (
    <Layout headerText={headerText} subHeaderText={subHeaderText}>
      <SEO title={tagHeader} pagePath={location.pathname} />
      <div className={blogStyles.blogContent}>
        {posts.map(({ node }) => {
          let series = node.frontmatter.series

          let seriesText =
            series !== null ? (
              <div className={blogStyles.postSubtitle}>
                {node.frontmatter.series}
              </div>
            ) : null

          let postImage = node.frontmatter.featuredImage.childImageSharp.fluid

          const backgroundFluidImageStack = [
            `linear-gradient(
                120deg,
                var(--blog-cover-one),
                var(--blog-cover-two)
              )`,
            postImage,
          ]

          return (
            <article key={node.fields.slug}>
              <BackgroundImage
                className={blogStyles.postImageContainer}
                fluid={backgroundFluidImageStack}
                backgroundColor={`#040e18`}
              >
                <header>
                  <h1>
                    <Link to={node.fields.slug}>
                      <div>{node.frontmatter.title}</div>
                      {seriesText}
                    </Link>
                  </h1>

                  <div className={blogStyles.date}>{node.frontmatter.date}</div>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: node.frontmatter.description || node.excerpt,
                    }}
                  />
                  <div className={blogStyles.readMore}>
                    <Link to={node.fields.slug}>Read more</Link>
                  </div>
                </section>
              </BackgroundImage>
            </article>
          )
        })}
      </div>
      {/* <div className={blogStyles.allTags}>
        <Link to="/tags">All tags</Link>
      </div> */}
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            series
            description
            featuredImage {
              childImageSharp {
                fluid(quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`
