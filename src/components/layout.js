import React from "react"
import { Link } from "gatsby"
import layoutStyles from "../styles/layout.module.css"
import Sticky from "react-stickynode"
import videoClip from '../assets/blue.mp4'

class Layout extends React.Component {
  render() {
    const { children } = this.props;
    const headerText = this.props.headerText;
    const subHeaderText = this.props.subHeaderText;
    const logoText = "Aleks Popovic";

    let stickyMenu = (
      <Sticky innerZ={100} enabled={true}>
        <div id={layoutStyles.menu}>
          <Link className={layoutStyles.logoText} to="/">
            {logoText}
          </Link>
          <Link activeClassName={layoutStyles.active} to="/">
            <div>blog</div>
          </Link>
          <Link activeClassName={layoutStyles.active} to="/projects">
            <div>projects</div>
          </Link>
          <Link activeClassName={layoutStyles.active} to="/aboutMe">
            <div>about me</div>
            </Link>
          <Link activeClassName={layoutStyles.active} to="/contact">
            <div>contact</div>
          </Link>
        </div>
      </Sticky>
    );

    let video = (
      <div id={layoutStyles.videoContainer}>
        <video autoPlay muted loop src={videoClip}>
            Your browser does not support HTML5 video.
        </video>
      </div>
    );

    let header = (
      <div className={layoutStyles.headerText}>
        <div className={layoutStyles.headerTitle}>{headerText}</div>
        <div className={layoutStyles.headerSubTitle}>{subHeaderText}</div>
      </div>
    )
    
    return (
      <div>
        <header>
          {stickyMenu}
          {video}
          {header}
        </header>
        <main>{children}</main>
        <footer className={layoutStyles.copyright}>
          © {new Date().getFullYear()}, Built with <a href="https://www.gatsbyjs.org">Gatsby</a>, by Aleks Popovic
        </footer>
      </div>
    )
  }
}

export default Layout
