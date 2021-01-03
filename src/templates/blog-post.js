import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import kebabCase from "lodash.kebabcase"
import blogPostStyles from "../styles/blogPost.module.css"
import usePosts from "../hooks/usePosts"
import SuggestedReading from "../components/suggestedReading"

function BlogPostTemplate(props) {
  const post = props.data.markdownRemark
  const { previous, next } = props.pageContext
  const tags = post.frontmatter.tags || []
  const devToPosts = usePosts()

  let devToArticle = devToPosts.filter(
    article =>
      article.title.toLowerCase() === post.frontmatter.title.toLowerCase()
  )[0]

  let likes, comments

  if (devToArticle) {
    likes = devToArticle.likes
    comments = devToArticle.comments
  }

  let featuredImgFluid = post.frontmatter.featuredImage.childImageSharp.fluid

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
      <SuggestedReading previous={previous} next={next} />
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
            fluid(maxWidth: 1920, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`
