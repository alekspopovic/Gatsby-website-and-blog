import React from "react"
import projectCardStyles from "../styles/projectCard.module.css"
import BackgroundImage from "gatsby-background-image"

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

    const { imageFluid } = this.props

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

    const backgroundFluidImageStack = [
      `linear-gradient(
        120deg,
        var(--project-bg-one),
        var(--project-bg-two)
      )`,
      imageFluid,
    ]

    return (
      <BackgroundImage
        className={projectCardStyles.card}
        fluid={backgroundFluidImageStack}
      >
        <div className={projectCardStyles.name}>{name}</div>
        <div className={projectCardStyles.description}>{description}</div>
        <div className={projectCardStyles.tags}>
          {tags.map(tag => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <div className={projectCardStyles.cardButton}>
          <a target="_blank" rel="noopener noreferrer" href={buttonUrl}>
            {buttonText}
          </a>
        </div>
      </BackgroundImage>
    )
  }
}

export default ProjectCard
