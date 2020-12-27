import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import blogStyles from "../styles/blog.module.css"
import usePosts from "../hooks/usePosts"
import ContentCard from "../components/contentCard"

function Blog(props) {
  const posts = props.data.allMarkdownRemark.edges
  const seoTitle = "Blog"

  const devToPosts = usePosts()

  return (
    <Layout>
      <SEO title={seoTitle} pagePath={props.location.pathname} />
      <div id="content" className={blogStyles.blogContent}>
        {posts.map(({ node }) => {
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
            <ContentCard
              key={node.fields.slug}
              slug={node.fields.slug}
              title={node.frontmatter.title}
              subTitle={node.frontmatter.series}
              date={node.frontmatter.date}
              content={node.excerpt}
              image={node.frontmatter.featuredImage.childImageSharp.fluid}
              buttonText="Continue reading"
              buttonUrl={node.fields.slug}
              likes={likes}
              comments={comments}
            />
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
