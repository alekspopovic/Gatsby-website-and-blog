import React from "react"
import ContentCard from "./contentCard"

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

    return (
      <ContentCard
        title={name}
        content={description}
        image={imageFluid}
        buttonText={buttonText}
        buttonUrl={buttonUrl}
        tags={tags}
      />
    )
  }
}

export default ProjectCard
