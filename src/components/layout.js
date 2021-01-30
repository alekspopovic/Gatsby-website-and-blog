import React from "react"
import Img from "gatsby-image"
import layoutStyles from "../styles/layout.module.css"
import Footer from "./footer"
import Navigation from "./navigation"

class Layout extends React.Component {
  render() {
    const { children } = this.props
    const {
      headerText,
      dateText,
      footerNoOffset,
      headerImageFluid,
      hideHeader,
    } = this.props

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
        <header>
          <Navigation />
          <div className={layoutStyles.titleContainer}>
            {headerImage}
            {headerTitle}
            {headerDate}
          </div>
        </header>
        <main>{children}</main>
        <Footer footerNoOffset={footerNoOffset} />
      </div>
    )
  }
}

export default Layout
