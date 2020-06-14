import React from "react"
// import { Link } from "gatsby"
import aboutStyles from "../styles/about.module.css"
// import Img from "gatsby-image"
import HeroHeader from "./heroHeader"

const About = () => {
  return (
    <div className={aboutStyles.about}>
      <HeroHeader />
    </div>
  )
}

export default About
