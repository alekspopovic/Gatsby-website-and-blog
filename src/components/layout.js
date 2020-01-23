import React from "react"
import { Link } from "gatsby"
import layoutStyles from "../styles/layout.module.css"
import Sticky from "react-stickynode"

class Layout extends React.Component {
  state = {
    isLogoTextVisible: false,
  }

  toggleLogoText = () => {
    this.setState(state => ({
      isLogoTextVisible: !state.isLogoTextVisible,
    }))
  }

  render() {
    const { isLogoTextVisible } = this.state
    const { children } = this.props

    let header = (
      <div className={layoutStyles.header}>
        <Link to="/">
          <div className={layoutStyles.headerText}>Aleksandar Popović</div>
        </Link>
        <Sticky enabled={true} onStateChange={this.toggleLogoText}>
          <div id={layoutStyles.menu}>
            <Link
              className={`${
                isLogoTextVisible
                  ? layoutStyles.logoText
                  : layoutStyles.hiddenLogoText
              }`}
              to="/"
            >
              Aleksandar Popović
            </Link>
            <Link to="/blog">
              <div>blog</div>
            </Link>
            <Link to="/projects">
              <div>projects</div>
            </Link>
            <Link to="/about">
              <div>about me</div>
            </Link>
            <Link to="/contact">
              <div>contact</div>
            </Link>
          </div>
        </Sticky>
      </div>
    )

    return (
      <div>
        <header>{header}</header>
        <main>{children}</main>
        <footer className={layoutStyles.copyright}>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>, by Aleks Popović
        </footer>
      </div>
    )
  }
}

export default Layout
