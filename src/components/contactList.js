import React from "react"
import contactListStyles from "../styles/contactList.module.css"
import "font-awesome/css/font-awesome.min.css"

const ContactList = () => {
  return (
    <div
      className={`${contactListStyles.sectionContent} ${contactListStyles.contact}`}
    >
      <h1>- Let's Get in Touch -</h1>
      <a
        target="_blank"
        className={`${contactListStyles.contactButton}`}
        href="mailto:aleksandar88popovic@gmail.com"
        rel="noopener noreferrer"
      >
        <i className="fa fa-envelope"></i> Send me an email
      </a>
      <div className={`${contactListStyles.social}`}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/alekspopovic/"
        >
          <i className="fa fa-linkedin"></i>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/alekswritescode"
        >
          <i className="fa fa-twitter"></i>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://codepen.io/aleksandarp/"
        >
          <i className="fa fa-codepen"></i>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/alekspopovic"
        >
          <i className="fa fa-github"></i>
        </a>
      </div>
    </div>
  )
}

export default ContactList
