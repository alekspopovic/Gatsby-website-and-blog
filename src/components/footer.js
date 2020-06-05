import React from "react"
import footerStyles from "../styles/footer.module.css"

const Footer = () => {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.socialIcons}>
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
          href="https://www.instagram.com/aleks.popovic/"
        >
          <i className="fa fa-instagram"></i>
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
      © {new Date().getFullYear()}, Built with{" "}
      <a href="https://www.gatsbyjs.org">Gatsby</a>, by Aleks Popovic
    </footer>
  )
}

export default Footer
