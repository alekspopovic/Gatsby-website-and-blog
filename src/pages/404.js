import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import fourOhFourStyles from "../styles/404.module.css"
import image from "../assets/404.svg"

class NotFoundPage extends React.Component {
  render() {
    const headerText = "404"
    const subHeaderText = "Page Not Found"

    return (
      <Layout
        headerText={headerText}
        subHeaderText={subHeaderText}
        hideHeader={true}
      >
        <SEO title="404: Not Found" />
        <div className={fourOhFourStyles.container}>
          <div className={fourOhFourStyles.imageContainer}>
            <img src={image} alt="page not found" />
          </div>
          <div className={fourOhFourStyles.content}>
            <p>
              It looks like the droids you're looking for are in another castle!
            </p>

            <p>
              You either found a broken link or the content you were looking for
              was removed. Either case - my bad!
            </p>

            <p>Here's a couple of pages you might have been looking for:</p>

            <ul className={fourOhFourStyles.pageList}>
              <li>
                <Link to="/">HOME</Link>
              </li>
              <li>
                <Link to="/blog">BLOG</Link>
              </li>
              <li>
                <Link to="/projects">PROJECTS</Link>
              </li>
              <li>
                <Link to="/contact">CONTACT</Link>
              </li>
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
