import React from "react"
import Layout from "../components/layout"
import About from "../components/about"
import SEO from "../components/seo"

class AboutMe extends React.Component {
  render() {
    const headerText = "About me"

    console.log(this.props)

    return (
      <Layout headerText={headerText}>
        <SEO title="About me" pagePath={this.props.location.pathname} />
        <About />
      </Layout>
    )
  }
}

export default AboutMe
