import React from "react"
import Layout from "../components/layout"
import ContactList from "../components/contactList"
import SEO from "../components/seo"

class Contact extends React.Component {
  render() {
    const headerText = "Contact";

    return (
      <Layout headerText={headerText}>
        <SEO title="Contact" />
        <ContactList />
      </Layout>
    )
  }
}

export default Contact
