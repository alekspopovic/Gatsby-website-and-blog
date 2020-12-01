import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import kebabCase from "lodash.kebabcase"
import blogPostStyles from "../styles/blogPost.module.css"
import usePosts from "../hooks/usePosts"

function BlogPostTemplate(props) {
  const post = props.data.markdownRemark
  const { previous, next } = props.pageContext
  const tags = post.frontmatter.tags || []
  const devToPosts = usePosts()

  let devToArticle = devToPosts.filter(
    article =>
      article.title.toLowerCase() === post.frontmatter.title.toLowerCase()
  )[0]

  let likes = 0
  let comments = 0

  if (devToArticle) {
    likes = devToArticle.likes
    comments = devToArticle.comments
  }

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

  let dateText = `${post.frontmatter.date} | Aleks Popovic`

  return (
    <Layout
      headerText={post.frontmatter.title}
      subHeaderText={post.frontmatter.series}
      seriesLink={post.frontmatter.seriesLink}
      dateText={dateText}
      background={true}
      headerImageFluid={featuredImgFluid}
      likes={likes}
      comments={comments}
    >
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        pagePath={props.location.pathname}
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
        series
        seriesLink
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
