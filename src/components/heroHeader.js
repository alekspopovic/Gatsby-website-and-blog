import React from "react"
import heroStyles from "../styles/hero.module.css"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faReact, faAngular, faUnity } from "@fortawesome/free-brands-svg-icons"

const HeroHeader = () => {
  // const videoLinks = [
  //   "dNTpGEULK_I",
  //   "9z1qBcFwdXg",
  //   "N5or5jBstg8",
  //   "r3tiBJagbic",
  //   "BdCCpAICXVc",
  //   "IAD68la3An8",
  //   "OIFN1pe72B4",
  //   "-rnkToU2_lw",
  //   "6sFTbTAVn5M",
  //   "lEXc1UTTLzc",
  //   "IiUg-2dAd4A",
  // ]

  // const previewVideoUrl =
  //   videoLinks[Math.floor(Math.random() * videoLinks.length)]

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
          <i
            className={`devicon-csharp-plain ${heroStyles.techIcon} ${heroStyles.csharp}`}
            title="C#"
          ></i>
          <FontAwesomeIcon
            className={`${heroStyles.techIcon} ${heroStyles.react}`}
            icon={faReact}
            title="React"
          />
          <FontAwesomeIcon
            className={`${heroStyles.techIcon} ${heroStyles.angular}`}
            icon={faAngular}
            title="Angular"
          />
          <FontAwesomeIcon
            className={`${heroStyles.techIcon} ${heroStyles.unity}`}
            icon={faUnity}
            title="Unity"
          />
        </div>

        {/* <div className={heroStyles.video}>
        <iframe
          src={`https://www.youtube.com/embed/${previewVideoUrl}`}
          title="YouTube tutorial preview"
        ></iframe>
      </div> */}
        <div className={heroStyles.button}>
          <Link to="/projects">Projects</Link>
        </div>
      </div>
    </div>
  )
}

export default HeroHeader
