import React from "react"
import Layout from "../components/layout"
import Landing from "../components/landing"
import SEO from "../components/seo"

class Index extends React.Component {
  render() {
    return (
      <Layout hideHeader={true}>
        <SEO title="Home" pagePath={this.props.location.pathname} />
        <Landing />
      </Layout>
    )
  }
}

export default Index
