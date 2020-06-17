import React from "react"
// import { Link } from "gatsby"
import aboutStyles from "../styles/about.module.css"
// import Img from "gatsby-image"
import HeroHeader from "./heroHeader"
import PortfolioProjects from "./portfolioProjects"

const About = () => {
  return (
    <div className={aboutStyles.about}>
      <HeroHeader />
      <PortfolioProjects />
    </div>
  )
}

export default About
