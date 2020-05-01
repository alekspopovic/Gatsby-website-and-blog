import React from "react"
import projectCardStyles from "../styles/projectCard.module.css"

class ProjectCard extends React.Component {
    render() {
        const { name, imageUrl, tags, description} = this.props.project;
        const floatRight = this.props.floatRight;

        let floatRightClass = "";

        if (floatRight === true) {
            floatRightClass = projectCardStyles.floatRight;
        }

        return (
            <div className={projectCardStyles.card}>
                <div className={`${projectCardStyles.imageContainer} ${floatRightClass}`}   >
                    <img src={imageUrl} alt=""/>
                </div>
                <div className={projectCardStyles.content}>
                    <div className={projectCardStyles.name}>{name}</div>
                    <div className={projectCardStyles.description}>{description}</div>
                    <div className={projectCardStyles.tags}>{
                        tags.map(tag => (
                            <span key={tag}>{tag}</span>
                        ))
                    }</div>
                </div>
                
            </div>
        )
    }
  }

  export default ProjectCard