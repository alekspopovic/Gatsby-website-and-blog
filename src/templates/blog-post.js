import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import kebabCase from "lodash.kebabcase"

import blogPostStyles from "../styles/blogPost.module.css"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const { previous, next } = this.props.pageContext
    const tags = post.frontmatter.tags || [];

    return (
      <Layout headerText={post.frontmatter.title} subHeaderText={post.frontmatter.date}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article className={blogPostStyles.blogPost}>
          <section dangerouslySetInnerHTML={{ __html: post.html }} />
          <hr />
          <div className={blogPostStyles.tags}>
            <ul>
              {tags.map(tag => (
                <Link key={kebabCase(tag)} to={`/tags/${kebabCase(tag)}`}>
                  <li>
                    {tag}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </article>

        <nav>
          <ul>
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
      }
    }
  }
`
