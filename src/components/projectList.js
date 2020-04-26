import React from "react"
import projectData from "../data/projectData"
import ProjectCard from "../components/projectCard"

import aboutStyles from "../styles/about.module.css"

class ProjectList extends React.Component {
  render () {

    return (
      <div className={`${aboutStyles.sectionContent} ${aboutStyles.about}`}>
        <h1>- Projects -</h1>
  
        {
          projectData.map(project => (
            <ProjectCard key={project.name} project={project} />
          ))
        }
        
      </div>
    )
  }
}

export default ProjectList
