import React from "react"
import { Link } from "gatsby"
import aboutStyles from "../styles/about.module.css"

const About = () => {
  return (
    <div className={aboutStyles.about}>
      <p>
        Hello! My name is Aleksandar Popović. I am a programmer, web designer
        and indie game developer, and this is my personal website. Welcome!
      </p>

      <p>
        If you like reading about programming, web design, or game development
        then check out my <Link to="/blog">BLOG</Link>, where I write about
        those and other tech-related topics.
      </p>

      <p>
        To check out my previous and currently ongoing projects please take a
        look at my <Link to="/projects">PROJECTS</Link> page.
      </p>

      <p>
        If you want us to work together or you just want to say hi - all of my
        contact details can be found on the <Link to="/contact">CONTACT</Link>{" "}
        page.
      </p>
    </div>
  )
}

export default About
