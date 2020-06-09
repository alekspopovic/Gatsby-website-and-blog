import React from "react"
import Layout from "../components/layout"
import { Link, graphql } from "gatsby"
import SEO from "../components/seo"
import tagStyles from "../styles/tags.module.css"

var kebabCase = require("lodash.kebabcase")

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
  location,
}) => (
  <Layout title={title} headerText="Tags">
    <SEO
      title="all tags"
      keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      pagePath={location.pathname}
    />
    <div className={tagStyles.tags}>
      {group.map(tag => (
        <Link key={tag.fieldValue} to={`/tags/${kebabCase(tag.fieldValue)}/`}>
          {tag.fieldValue} <span>{tag.totalCount}</span>
        </Link>
      ))}
    </div>
  </Layout>
)

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
