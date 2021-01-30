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

  const headerText = `tags/${tag}`

  return (
    <Layout headerText={headerText}>
      <SEO title={tagHeader} pagePath={location.pathname} />
      <div className={blogStyles.blogContent}>
        {posts.map(({ node }) => {
          let postImage = node.frontmatter.featuredImage.childImageSharp.fluid

          return (
            <ContentCard
              slug={node.fields.slug}
              title={node.frontmatter.title}
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
