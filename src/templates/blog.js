import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import blogStyles from "../styles/blog.module.css"
import Link from "gatsby-link"
import Img from "gatsby-image"
import usePosts from "../hooks/usePosts"
import Impressions from "../components/impressions"

function Blog(props) {
  const posts = props.data.allMarkdownRemark.edges
  const seoTitle = "Blog"

  const devToPosts = usePosts()

  return (
    <Layout>
      <SEO title={seoTitle} pagePath={props.location.pathname} />
      <div id="content" className={blogStyles.blogContent}>
        {posts.map(({ node }) => {
          let series = node.frontmatter.series

          let seriesText =
            series !== null ? (
              <div className={blogStyles.postSubtitle}>
                {node.frontmatter.series}
              </div>
            ) : null

          let postImage = node.frontmatter.featuredImage.childImageSharp.fluid

          let devToArticle = devToPosts.filter(
            article =>
              article.title.toLowerCase() ===
              node.frontmatter.title.toLowerCase()
          )[0]

          let likes = 0
          let comments = 0

          if (devToArticle) {
            likes = devToArticle.likes
            comments = devToArticle.comments
          }

          return (
            <article key={node.fields.slug}>
              <Img
                className={blogStyles.postImageContainer}
                fluid={postImage}
              />
              <header>
                <h1>
                  <Link to={node.fields.slug}>
                    <div>{node.frontmatter.title}</div>
                    {seriesText}
                  </Link>
                </h1>
                <div className={blogStyles.date}>{node.frontmatter.date}</div>
                <Impressions likes={likes} comments={comments} />
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.excerpt,
                  }}
                />
                <div className={blogStyles.readMore}>
                  <Link to={node.fields.slug}>Continue reading</Link>
                </div>
              </section>
            </article>
          )
        })}
      </div>
    </Layout>
  )
}

export default Blog

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1000
    ) {
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
    }
  }
`
