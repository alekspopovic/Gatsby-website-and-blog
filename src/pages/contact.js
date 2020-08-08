import React from "react"
import Layout from "../components/layout"
import ContactList from "../components/contactList"
import SEO from "../components/seo"

class Contact extends React.Component {
  render() {
    return (
      <Layout>
        <SEO title="Contact" pagePath={this.props.location.pathname} />
        <ContactList />
      </Layout>
    )
  }
}

export default Contact
