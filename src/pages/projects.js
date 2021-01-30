import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

class Projects extends React.Component {
  render() {
    return (
      <Layout footerNoOffset={true}>
        <SEO title="Projects" pagePath={this.props.location.pathname} />
      </Layout>
    )
  }
}

export default Projects
