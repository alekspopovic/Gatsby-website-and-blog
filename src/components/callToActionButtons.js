import React from "react"
import ctaStyles from "../styles/callToActionButtons.module.css"
import { Link } from "gatsby"

export default function callToActionButtons() {
  return (
    <div className={ctaStyles.container}>
      <Link to="/projects" className={ctaStyles.button}>
        Check out my Projects
      </Link>
      <a
        href="https://www.youtube.com/@AleksPopovic/videos"
        target="_blank"
        rel="noopener noreferrer"
        className={ctaStyles.button}
      >
        Watch my tutorials
      </a>
      <Link to="/blog" className={ctaStyles.button}>
        Read my Blog
      </Link>
    </div>
  )
}
