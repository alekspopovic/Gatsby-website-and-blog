import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ContentCard from "../components/contentCard"

import blogStyles from "../styles/blog.module.css"

const Tags = ({ pageContext, data, location }) => {
  const { tag } = pageContext
  const totalCount = data.allMarkdownRemark.totalCount
  const posts = data.allMarkdownRemark.edges
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  return (
    <Layout>
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

          return (
            <ContentCard
              key={node.fields.slug}
              slug={node.fields.slug}
              title={node.frontmatter.title}
              subTitle={seriesText}
              date={node.frontmatter.date}
              content={node.excerpt}
              image={postImage}
              buttonText="Continue reading"
              buttonUrl={node.fields.slug}
              isInternal={true}
            />
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
