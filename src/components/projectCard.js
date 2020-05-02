import React from "react"
import projectCardStyles from "../styles/projectCard.module.css"

class ProjectCard extends React.Component {
    render() {
        const { name, imageUrl, tags, description, url, itchIoUrl, playStoreUrl} = this.props.project;
        const floatRight = this.props.floatRight;

        let floatRightClass = "";

        if (floatRight === true) {
            floatRightClass = projectCardStyles.floatRight;
        }

        let buttonUrl = "";
        let buttonText = "";

        if (url != null) {
            buttonUrl = url;
            buttonText = "Visit Website";
        } else if (itchIoUrl != null) {
            buttonUrl = itchIoUrl;
            buttonText = "View on Itch.io";
        } else if (playStoreUrl != null) {
            buttonUrl = playStoreUrl;
            buttonText = "View on Android Playstore";
        }

        return (
            <div className={`${projectCardStyles.card} ${floatRightClass}`}>
                <div className={projectCardStyles.imageContainer}>
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
                    <div className={projectCardStyles.cardButton}>
                        <a target="_blank" rel="noopener noreferrer" href={buttonUrl}>{buttonText}</a>
                    </div>
                </div>
            </div>
        )
    }
  }

  export default ProjectCard