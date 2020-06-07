import React from "react"
import Layout from "../components/layout"
import About from "../components/about"
import SEO from "../components/seo"

class AboutMe extends React.Component {
  render() {
    const headerText = "About me"

    return (
      <Layout headerText={headerText}>
        <SEO title="About me" />
        <About />
      </Layout>
    )
  }
}

export default AboutMe
