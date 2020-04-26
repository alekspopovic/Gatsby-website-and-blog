import React from "react"
import projectCardStyles from "../styles/projectCard.module.css"

class ProjectCard extends React.Component {
    render() {
        const { name, imageUrl, tags} = this.props.project;

        return (
            <div className={projectCardStyles.card}>
                <img src={imageUrl} alt=""/>
                <div className={projectCardStyles.overlay}>
                    <div className={projectCardStyles.cardTitle}>
                        <div>{name}</div>
                        <div className={projectCardStyles.tags}>{
                            tags.map(tag => (
                                <span key={tag}>{tag}</span>
                            ))
                        }</div>
                    </div>
                </div>
                
            </div>
        )
    }
  }

  export default ProjectCard