import React from "react"
import footerStyles from "../styles/footer.module.css"

const Footer = props => {
  const { footerNoOffset } = props
  let offsetClass

  if (footerNoOffset) {
    offsetClass = footerStyles.noOffset
  }

  return (
    <footer className={`${footerStyles.footer} ${offsetClass}`}>
      <div className={footerStyles.socialIcons}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.youtube.com/channel/UCu3RVedqyL5o776xyQlbyAw"
        >
          <i className="fa fa-youtube"></i>
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
          href="https://www.linkedin.com/in/alekspopovic/"
        >
          <i className="fa fa-linkedin"></i>
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
      © {new Date().getFullYear()}, Built with <i className="fa fa-coffee"></i>{" "}
      and <i className="fa fa-code"></i>, by{" "}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://aleksandarpopovic.com"
      >
        Aleks Popovic
      </a>
    </footer>
  )
}

export default Footer
