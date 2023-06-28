import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import layoutStyles from "../styles/layout.module.css"
import logo from "../assets/logoText.svg"
import Footer from "./footer"
import Impressions from "../components/impressions"

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
      seriesLink,
      likes,
      comments,
    } = this.props

    let darkBackgroundClass, theme

    if (background) {
      darkBackgroundClass = layoutStyles.darkBackground
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
          <img className={layoutStyles.logoLight} src={logo} alt="icon"></img>
        </Link>
        <Link activeClassName={layoutStyles.active} to="/">
          <div>home</div>
        </Link>
        <Link activeClassName={layoutStyles.active} to="/blog/">
          <div>blog</div>
        </Link>
        <Link activeClassName={layoutStyles.active} to="/projects/">
          <div>projects</div>
        </Link>
        <Link activeClassName={layoutStyles.active} to="/contact/">
          <div>contact</div>
        </Link>
        <button
          id={layoutStyles.lightMode}
          onClick={e => this.switchTheme(e)}
          className={clicked}
        ></button>
      </div>
    )

    let seriesLinkSrc = seriesLink ? `/tags/${seriesLink}` : "/"

    let headerSubtitle = subHeaderText ? (
      <h2 className={layoutStyles.headerSubtitle}>
        <Link to={seriesLinkSrc}>{subHeaderText}</Link>
      </h2>
    ) : null

    let headerDate = dateText ? (
      <h2 className={layoutStyles.headerDate}>{dateText}</h2>
    ) : null

    let headerTitle

    if (!hideHeader && headerText && headerImageFluid) {
      let headerTitleClass = !headerDate
        ? layoutStyles.headerTitleNoImage
        : layoutStyles.headerTitle

      headerTitle = <h1 className={headerTitleClass}>{headerText}</h1>
    }

    let headerImage

    if (headerImageFluid) {
      headerImage = (
        <Img
          fluid={headerImageFluid}
          className={layoutStyles.blogPostHeaderImage}
        />
      )
    }

    return (
      <div>
        <header className={darkBackgroundClass}>
          {stickyMenu}
          {headerImage}
          <div className={layoutStyles.titleContainer}>
            {headerTitle}
            {headerSubtitle}
            {headerDate}
            {(likes || comments) && (
              <Impressions likes={likes} comments={comments} />
            )}
          </div>
        </header>
        <main className={darkBackgroundClass}>{children}</main>
        <Footer footerNoOffset={footerNoOffset} />
      </div>
    )
  }
}

export default Layout
