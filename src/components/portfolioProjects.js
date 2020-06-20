import React from "react"
import portfolioProjectsStyles from "../styles/portfolioProjects.module.css"
import { graphql, useStaticQuery } from "gatsby"
import ProjectCard from "../components/projectCard"
import cinciData from "../data/cinciData"
import milosData from "../data/milosData"
import { Link } from "gatsby"

const PortfolioProjects = () => {
  const images = useStaticQuery(graphql`
    query {
      cinciImage: file(relativePath: { eq: "cinci.jpg" }) {
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      milosImage: file(relativePath: { eq: "milos.jpg" }) {
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <div className={portfolioProjectsStyles.portfolioProjectsContainer}>
      <h1 className={portfolioProjectsStyles.projectsHeader}>
        Some of My Work
      </h1>
      <ProjectCard
        project={cinciData}
        imageFluid={images.cinciImage.childImageSharp.fluid}
      />
      <ProjectCard
        project={milosData}
        floatRight={true}
        imageFluid={images.milosImage.childImageSharp.fluid}
      />

      <div className={portfolioProjectsStyles.buttonContainer}>
        <div className={portfolioProjectsStyles.cardButton}>
          <Link to="/projects">View All Projects</Link>
        </div>

        <div
          className={`${portfolioProjectsStyles.cardButton} ${portfolioProjectsStyles.secondary}`}
        >
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </div>
  )
}

export default PortfolioProjects
