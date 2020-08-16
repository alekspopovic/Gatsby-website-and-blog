import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import blogStyles from "../styles/blog.module.css"
import Link from "gatsby-link"
import BackgroundImage from "gatsby-background-image"

class Blog extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const seoTitle = "Blog"

    return (
      <Layout>
        <SEO title={seoTitle} pagePath={this.props.location.pathname} />
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

            const backgroundFluidImageStack = [
              `linear-gradient(
                120deg,
                var(--blog-cover-one),
                var(--blog-cover-two)
              )`,
              postImage,
            ]

            // let tags = []

            // node.frontmatter.tags.sort().forEach(tag => {
            //   tags.push(
            //     <span className={blogStyles.tag} key={tag}>
            //       {tag}
            //     </span>
            //   )
            // })

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
                        <div>{node.frontmatter.title}</div>
                        {seriesText}
                      </Link>
                    </h1>

                    <div className={blogStyles.date}>
                      {node.frontmatter.date}
                    </div>
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
                    {/* <div className={blogStyles.tagSummary}>{tags}</div> */}
                  </section>
                </BackgroundImage>
              </article>
            )
          })}
        </div>
      </Layout>
    )
  }
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
