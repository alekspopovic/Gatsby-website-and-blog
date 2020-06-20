import React from "react"
import aboutStyles from "../styles/about.module.css"
import HeroHeader from "./heroHeader"
import PortfolioProjects from "./portfolioProjects"

const About = () => {
  return (
    <div className={aboutStyles.about}>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/konpa/devicon@master/devicon.min.css"
      ></link>
      <HeroHeader />
      <PortfolioProjects />
    </div>
  )
}

export default About
