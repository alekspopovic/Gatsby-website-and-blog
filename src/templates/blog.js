import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import blogStyles from "../styles/blog.module.css"
import Link from "gatsby-link"
import Img from "gatsby-image"
import BackgroundImage from "gatsby-background-image"

class Blog extends React.Component {
  render() {
    const headerText = "Aleks Popovic's Blog"
    const posts = this.props.data.allMarkdownRemark.edges
    const seoTitle = "Blog"

    return (
      <Layout headerText={headerText} background={true}>
        <SEO title={seoTitle} pagePath={this.props.location.pathname} />
        <div id="content" className={blogStyles.blogContent}>
          {posts.map(({ node }) => {
            let subtitle = node.frontmatter.subtitle

            let subtitleText =
              subtitle !== null ? (
                <span className={blogStyles.postSubtitle}>
                  {node.frontmatter.subtitle}
                </span>
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
                        {node.frontmatter.title}
                        {subtitleText}
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
                  </section>
                </BackgroundImage>
                {/* <header>
                  <h1>
                    <Link to={node.fields.slug}>
                      {node.frontmatter.title}
                      {subtitleText}
                    </Link>
                  </h1>

                  <div className={blogStyles.date}>{node.frontmatter.date}</div>
                </header> */}
              </article>
            )
          })}
        </div>

        {/* <div className={blogStyles.paginationUrls}>
          <PaginationUrl
            className={blogStyles.newerPosts}
            contentSection={blogStyles.blogContent}
            test={first}
            url={previousUrl}
            text="Newer"
          />
          <PaginationUrl
            className={blogStyles.olderPosts}
            contentSection={blogStyles.blogContent}
            test={last}
            url={nextUrl}
            text="Older"
          />
        </div> */}

        {/* <PostArchive history={postHistory} /> */}
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
            subtitle
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
