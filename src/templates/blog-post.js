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
    const tags = post.frontmatter.tags || []

    let postNavigation

    let featuredImgFluid = post.frontmatter.featuredImage.childImageSharp.fluid

    if (previous || next) {
      postNavigation = (
        <div className={blogPostStyles.postNavigation}>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </div>
      )
    }

    let subHeaderText = `${post.frontmatter.date} | Aleks Popovic`

    return (
      <Layout
        headerText={post.frontmatter.title}
        subHeaderText={subHeaderText}
        background={true}
        headerImageFluid={featuredImgFluid}
      >
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
          pagePath={this.props.location.pathname}
          image={featuredImgFluid.src}
        />
        <article className={blogPostStyles.blogPost}>
          <section dangerouslySetInnerHTML={{ __html: post.html }} />
          <hr />
          <div className={blogPostStyles.tags}>
            <ul>
              {tags.map(tag => (
                <Link key={kebabCase(tag)} to={`/tags/${kebabCase(tag)}`}>
                  <li>{tag}</li>
                </Link>
              ))}
            </ul>
          </div>
        </article>
        {postNavigation}
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
`
