import React from "react"
import { Link } from "gatsby"
import aboutStyles from "../styles/about.module.css"

const About = () => {
  return (
    <div className={`${aboutStyles.sectionContent} ${aboutStyles.about}`}>
      <p>
        My name is Aleksandar Popović. Creating something from nothing has
        always been my passion, and that is why I love coding, web development
        and game design. I am currently working a full-time job as a full-stack
        web developer, but I am also open to doing freelance work.
      </p>

      <p>
        These pages are intended as a personal website where I will showcase my
        previous (and occasionally current) work and which I will use as a sort
        of a public reminder on anything and everything.
      </p>

      <p>
        If you like reading about programming, web development, and game design
        then check out my <Link to="/blog">BLOG</Link>, where I write about
        those and other tech-related topics.
      </p>

      <p>
        To check out my previous and currently ongoing projects please take a
        look at my <Link to="/projects">PROJECTS</Link> page.
      </p>

      <p>
        If you want us to work together or you just want to say hi - all of my
         contact details can be found on the <Link to="/contact">CONTACT</Link> page.
      </p>
    </div>
  )
}

export default About
