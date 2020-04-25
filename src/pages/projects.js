import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ProjectList from "../components/projectList"

class Projects extends React.Component {
  render() {
    return (
      <Layout>
        <SEO title="Projects" />
        <ProjectList />
      </Layout>
    )
  }
}

export default Projects