import React from "react"
import footerStyles from "../styles/footer.module.css"

const Footer = () => {
  return (
    <footer className={footerStyles.footer}>
      © {new Date().getFullYear()}, Built with{" "}
      <a href="https://www.gatsbyjs.org">Gatsby</a>, by Aleks Popovic
    </footer>
  )
}

export default Footer
