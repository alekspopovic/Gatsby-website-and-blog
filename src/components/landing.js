import React from "react"
import landingStyles from "../styles/landing.module.css"
import HeroHeader from "./heroHeader"
import PortfolioProjects from "./portfolioProjects"
// import CallToActionButtons from "./callToActionButtons"

const Landing = () => {
  return (
    <div className={landingStyles.landingContainer}>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/konpa/devicon@master/devicon.min.css"
      ></link>
      <HeroHeader />
      {/* <CallToActionButtons /> */}
      <PortfolioProjects />
    </div>
  )
}

export default Landing
