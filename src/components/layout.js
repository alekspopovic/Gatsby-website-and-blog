import React from "react"
import { Link } from "gatsby"
import layoutStyles from "../styles/layout.module.css"
import Sticky from "react-stickynode"
import videoClip from "../assets/blue.mp4"
import icon from "../assets/icon.svg"
import Footer from "./footer"
import Img from "gatsby-image"

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
    const {
      headerText,
      subHeaderText,
      background,
      footerNoOffset,
      headerImageFluid,
      hideHeader,
    } = this.props

    let mainClass, theme

    if (background) {
      mainClass = layoutStyles.darkBackground
    }

    const windowGlobal = typeof window !== "undefined" && window

    if (windowGlobal.localStorage) {
      theme = windowGlobal.localStorage.getItem("theme")
    }

    let clicked = ""

    if (theme === "light") {
      document.body.classList.add(theme)
      clicked = layoutStyles.clicked
    }

    let stickyMenu = (
      <Sticky innerZ={100} enabled={true}>
        <div id={layoutStyles.menu}>
          <Link className={layoutStyles.logoText} to="/">
            <img src={icon} alt="icon"></img>leks Popovic
          </Link>
          <Link activeClassName={layoutStyles.active} to="/">
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

    let headerBackground
    let headerTextClass

    if (!hideHeader) {
      if (headerImageFluid) {
        headerBackground = (
          <Img fluid={headerImageFluid} className={layoutStyles.headerImage} />
        )

        headerTextClass = layoutStyles.headerTextForImage
      } else {
        headerBackground = (
          <div id={layoutStyles.headerBackgroundContainer}>
            <video autoPlay muted loop src={videoClip}>
              Your browser does not support HTML5 video.
            </video>
          </div>
        )

        headerTextClass = layoutStyles.headerTextForVideo
      }
    }

    let header

    if (!hideHeader) {
      header = (
        <div className={headerTextClass}>
          <h1 className={layoutStyles.headerTitle}>{headerText}</h1>
          <div>
            <h2 className={layoutStyles.headerSubTitle}>{subHeaderText}</h2>
          </div>
        </div>
      )
    }

    return (
      <div>
        <header>
          {stickyMenu}
          {headerBackground}
          {header}
        </header>
        <main className={mainClass}>{children}</main>
        <Footer footerNoOffset={footerNoOffset} />
      </div>
    )
  }
}

export default Layout
