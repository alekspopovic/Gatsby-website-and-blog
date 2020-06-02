import React from "react"
import { Link } from "gatsby"
import layoutStyles from "../styles/layout.module.css"
import Sticky from "react-stickynode"
import videoClip from "../assets/blue.mp4"
import icon from "../assets/icon.svg"

class Layout extends React.Component {
  switchTheme = e => {
    const body = document.body
    const lightThemeClass = "light"
    const clickedClassName = layoutStyles.clicked

    if (body.classList.contains(lightThemeClass)) {
      body.classList.remove(lightThemeClass)
      e.target.classList.remove(clickedClassName)
      localStorage.setItem("theme", "dark")
    } else {
      body.classList.add(lightThemeClass)
      e.target.classList.add(clickedClassName)
      localStorage.setItem("theme", "light")
    }
  }

  render() {
    const { children } = this.props
    const { headerText, subHeaderText, background } = this.props
    let mainClass

    if (background) {
      mainClass = layoutStyles.darkBackground
    }

    const theme = localStorage.getItem("theme")

    let clicked = ""

    if (theme === "light") {
      document.body.classList.add(theme)
      clicked = layoutStyles.clicked
    }

    let stickyMenu = (
      <Sticky innerZ={100} enabled={true}>
        <div id={layoutStyles.menu}>
          <Link className={layoutStyles.logoText} to="/blog">
            <img src={icon} alt="icon"></img>leks Popovic
          </Link>
          <Link activeClassName={layoutStyles.active} to="/blog">
            <div>blog</div>
          </Link>
          <Link activeClassName={layoutStyles.active} to="/projects">
            <div>projects</div>
          </Link>
          <Link activeClassName={layoutStyles.active} to="/aboutMe">
            <div>about</div>
          </Link>
          <Link activeClassName={layoutStyles.active} to="/contact">
            <div>contact</div>
          </Link>
          <button
            id={layoutStyles.lightMode}
            onClick={e => this.switchTheme(e)}
            className={clicked}
          ></button>
        </div>
      </Sticky>
    )

    let video = (
      <div id={layoutStyles.videoContainer}>
        <video autoPlay muted loop src={videoClip}>
          Your browser does not support HTML5 video.
        </video>
      </div>
    )

    let header = (
      <div className={layoutStyles.headerText}>
        <h1 className={layoutStyles.headerTitle}>{headerText}</h1>
        <h2 className={layoutStyles.headerSubTitle}>{subHeaderText}</h2>
      </div>
    )

    return (
      <div>
        <header>
          {stickyMenu}
          {video}
          {header}
        </header>
        <main className={mainClass}>{children}</main>
        <footer className={layoutStyles.copyright}>
          © {new Date().getFullYear()}, Built with{" "}
          <a href="https://www.gatsbyjs.org">Gatsby</a>, by Aleks Popovic
        </footer>
      </div>
    )
  }
}

export default Layout
