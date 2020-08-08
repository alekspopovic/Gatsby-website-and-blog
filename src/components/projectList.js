import React from "react"
import projectData from "../data/projectData"
import ProjectCard from "../components/projectCard"
import { useStaticQuery, graphql } from "gatsby"
import projectListStyles from "../styles/projectList.module.css"

const ProjectList = () => {
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
    <div className={projectListStyles.projectCardList}>
      {projectData.map(function(project) {
        let result = images.filter(image => {
          return image.node.fluid.originalName === project.imageUrl
        })

        return (
          <ProjectCard
            key={project.name}
            project={project}
            imageFluid={result[0].node.fluid}
          />
        )
      })}
    </div>
  )
}

export default ProjectList
