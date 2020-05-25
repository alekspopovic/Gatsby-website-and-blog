import React from "react"
import projectCardStyles from "../styles/projectCard.module.css"

class ProjectCard extends React.Component {
  render() {
    const {
      name,
      imageUrl,
      tags,
      description,
      url,
      itchIoUrl,
      playStoreUrl,
    } = this.props.project
    const floatRight = this.props.floatRight

    let floatRightClass = ""

    if (floatRight === true) {
      floatRightClass = projectCardStyles.floatRight
    }

    let buttonUrl = ""
    let buttonText = ""

    if (url) {
      buttonUrl = url
      buttonText = "Visit Website"
    } else if (itchIoUrl) {
      buttonUrl = itchIoUrl
      buttonText = "View on Itch.io"
    } else if (playStoreUrl) {
      buttonUrl = playStoreUrl
      buttonText = "View on Android Playstore"
    }

    return (
      <div className={`${projectCardStyles.card} ${floatRightClass}`}>
        <div className={projectCardStyles.name}>{name}</div>

        <div className={projectCardStyles.content}>
          <img src={imageUrl} alt={name} />
          <div className={projectCardStyles.text}>
            <div className={projectCardStyles.description}>{description}</div>
            <div className={projectCardStyles.tags}>
              {tags.map(tag => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className={projectCardStyles.cardButton}>
          <a target="_blank" rel="noopener noreferrer" href={buttonUrl}>
            {buttonText}
          </a>
        </div>
      </div>
    )
  }
}

export default ProjectCard
