import React from "react"
import projectData from "../data/projectData"
import ProjectCard from "../components/projectCard"
import { useStaticQuery, graphql } from "gatsby"

import projectListStyles from "../styles/projectList.module.css"

const ProjectList = () => {
  let counter = 1

  const data = useStaticQuery(graphql`
    query {
      allImageSharp {
        edges {
          node {
            fluid(quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
              originalName
            }
          }
        }
      }
    }
  `)

  let images = data.allImageSharp.edges

  return (
    <div className={`${projectListStyles.sectionContent}`}>
      {projectData.map(function(project) {
        let floatRight = false

        if (counter % 2 === 0) {
          floatRight = true
        }

        counter++

        let result = images.filter(image => {
          return image.node.fluid.originalName === project.imageUrl
        })

        return (
          <ProjectCard
            key={project.name}
            project={project}
            floatRight={floatRight}
            imageFluid={result[0].node.fluid}
          />
        )
      })}
    </div>
  )
}

export default ProjectList
