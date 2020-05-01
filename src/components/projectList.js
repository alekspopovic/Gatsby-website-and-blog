import React from "react"
import projectData from "../data/projectData"
import ProjectCard from "../components/projectCard"

import projectListStyles from "../styles/projectList.module.css"

class ProjectList extends React.Component {
  render () {

    let counter = 1;

    return (
      <div className={`${projectListStyles.sectionContent}`}>
        <h1>- Projects -</h1>
  
        {
          projectData.map(function(project) {
            let floatRight = false;

            if (counter % 2 === 0) {
              floatRight = true;
            }

            counter++;

            return <ProjectCard key={project.name} project={project} floatRight={floatRight} />
          })
        }
        
      </div>
    )
  }
}

export default ProjectList
