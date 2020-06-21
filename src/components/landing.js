import React from "react"
import landingStyles from "../styles/landing.module.css"
import HeroHeader from "./heroHeader"
import PortfolioProjects from "./portfolioProjects"

const Landing = () => {
  return (
    <div className={landingStyles.landingContainer}>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/konpa/devicon@master/devicon.min.css"
      ></link>
      <HeroHeader />
      <PortfolioProjects />
    </div>
  )
}

export default Landing
