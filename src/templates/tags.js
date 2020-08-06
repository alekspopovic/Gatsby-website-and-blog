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
    <Layout
      headerText={headerText}
      subHeaderText={subHeaderText}
      background={true}
    >
      <SEO title={tagHeader} pagePath={location.pathname} />
      <div className={blogStyles.blogContent}>
        {posts.map(({ node }) => {
          let subtitle = node.frontmatter.subtitle

          let subtitleText =
            subtitle !== null ? (
              <span className={blogStyles.postSubtitle}>
                {node.frontmatter.subtitle}
              </span>
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
                      {node.frontmatter.title}
                      {subtitleText}
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
      <div className={blogStyles.allTags}>
        <Link to="/tags">All tags</Link>
      </div>
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
