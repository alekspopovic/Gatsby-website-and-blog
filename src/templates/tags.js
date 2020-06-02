import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

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
      <SEO title={tagHeader} />
      <div className={blogStyles.blogContent}>
        {posts.map(({ node }) => {
          const { slug } = node.fields
          const { title } = node.frontmatter
          return (
            <article key={slug}>
              <header>
                <h1>
                  <Link to={slug}>{title}</Link>
                </h1>
                <small>{node.frontmatter.date}</small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
                <div className={blogStyles.readMore}>
                  <Link to={slug}>Read more</Link>
                </div>
              </section>
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
          }
        }
      }
    }
  }
`
