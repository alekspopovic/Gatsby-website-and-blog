import React from "react"
import { Link } from "gatsby"
import layoutStyles from "../styles/layout.module.css"
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
      dateText,
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
      <div id={layoutStyles.menu}>
        <Link className={layoutStyles.logoText} to="/">
          <img src={icon} alt="icon"></img>leks Popovic
        </Link>
        <Link activeClassName={layoutStyles.active} to="/">
          <div>home</div>
        </Link>
        <Link activeClassName={layoutStyles.active} to="/blog">
          <div>blog</div>
        </Link>
        <Link activeClassName={layoutStyles.active} to="/projects">
          <div>projects</div>
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
    )

    let headerBackground
    let headerTextClass

    if (!hideHeader && headerImageFluid) {
      headerBackground = (
        <Img fluid={headerImageFluid} className={layoutStyles.headerImage} />
      )

      headerTextClass = layoutStyles.headerTextForImage
    }

    let header

    let headerSubtitle = subHeaderText ? (
      <h2 className={layoutStyles.headerSubtitle}>{subHeaderText}</h2>
    ) : null

    let headerDate = dateText ? (
      <h2 className={layoutStyles.headerDate}>{dateText}</h2>
    ) : null

    let headerTitleClass = !headerDate
      ? layoutStyles.headerTitleNoImage
      : layoutStyles.headerTitle

    if (!hideHeader) {
      header = (
        <div className={headerTextClass}>
          <h1 className={headerTitleClass}>{headerText}</h1>
          {headerSubtitle}
          {headerDate}
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
