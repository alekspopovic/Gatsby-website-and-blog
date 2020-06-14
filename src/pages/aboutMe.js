import React from "react"
import Layout from "../components/layout"
import About from "../components/about"
import SEO from "../components/seo"

class AboutMe extends React.Component {
  render() {
    return (
      <Layout hideHeader={true}>
        <SEO title="About me" pagePath={this.props.location.pathname} />
        <About />
      </Layout>
    )
  }
}

export default AboutMe
