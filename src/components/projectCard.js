import React from "react"

class ProjectCard extends React.Component {
    render() {
        const { name, url, imageUrl, description, tags} = this.props.project;

        return (
            <div>
                <div>{name}</div>
                <div>{description}</div>
                <div>{url}</div>
                <div>{imageUrl}</div>
                <div>{
                    tags.map(tag => (
                        <div>{tag}</div>
                    ))
                }</div>
            </div>
        )
    }
  }

  export default ProjectCard