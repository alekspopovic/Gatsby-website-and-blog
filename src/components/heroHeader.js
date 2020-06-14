import React from "react"
import heroStyles from "../styles/hero.module.css"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

const HeroHeader = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "aleks.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <div className={heroStyles.heroContainer}>
      <div className={heroStyles.section}>
        <div className={heroStyles.profileImageContainer}>
          <Img fluid={data.file.childImageSharp.fluid} />
        </div>
        <h1>Hi, I'm Aleks</h1>
        <h2>
          <span>I</span>
          <div className={heroStyles.words}>
            <span>design</span>
            <span>program</span>
            <span>create</span>
            <span>construct</span>
            <span>develop</span>
          </div>
          <div>user experiences</div>
          <div>in</div>
        </h2>
        <div className={heroStyles.tech}>
          <span>C#</span>
          <span>React</span>
          <span>Angular</span>
          <span>Unity</span>
        </div>
      </div>
    </div>
  )
}

export default HeroHeader
