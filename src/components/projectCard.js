import React from "react"
import projectCardStyles from "../styles/projectCard.module.css"
import Img from "gatsby-image"

class ProjectCard extends React.Component {
  render() {
    const {
      name,
      tags,
      description,
      url,
      itchIoUrl,
      playStoreUrl,
    } = this.props.project

    const { floatRight, imageFluid } = this.props

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
          <div className={projectCardStyles.fluidImageContainer}>
            <Img fluid={imageFluid} alt={name} />
          </div>
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
