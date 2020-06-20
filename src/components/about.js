import React from "react"
// import { Link } from "gatsby"
import aboutStyles from "../styles/about.module.css"
// import Img from "gatsby-image"
import HeroHeader from "./heroHeader"
import PortfolioProjects from "./portfolioProjects"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDesktop } from "@fortawesome/free-solid-svg-icons"

const About = () => {
  return (
    <div className={aboutStyles.about}>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/konpa/devicon@master/devicon.min.css"
      ></link>
      <HeroHeader />
      <PortfolioProjects />
      <FontAwesomeIcon icon={faDesktop} />
    </div>
  )
}

export default About
