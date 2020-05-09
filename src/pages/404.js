import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import fourOhFourStyles from "../styles/404.module.css"

class NotFoundPage extends React.Component {
  render() {
    const headerText = "404";
    const subHeaderText = "Page Not Found";

    return (
      <Layout headerText={headerText} subHeaderText={subHeaderText}>
        <SEO title="404: Not Found" />
        <div className={fourOhFourStyles.main}>
          <p>It looks like the droids you're looking for are in another castle. Or something like that?</p>

          <p>You either found a broken link or the content you were looking for was removed. Either case - my bad!</p>

          <p>
            If you were looking for a specific blog post head over to my <Link to="/blog">BLOG</Link>, and maybe you can find it over there.
          </p>

          <p>
            To check out my previous and currently ongoing projects please take a
            look at my <Link to="/projects">PROJECTS</Link> page.
          </p>

          <p>
            If you want us to work together or you just want to say hi - all of my
            contact details can be found on the <Link to="/contact">CONTACT</Link> page.
          </p>

          <p>To read more about me and see a page eerily similar to this one - check out my <Link to="/about">ABOUT ME</Link> page. Very inventive name - I know!</p>
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
