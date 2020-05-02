import React from "react"
import { Link } from "gatsby"
import layoutStyles from "../styles/layout.module.css"
import Sticky from "react-stickynode"
import videoClip from '../assets/blue.mp4'

class Layout extends React.Component {
  render() {
    const { children } = this.props;
    const headerText = this.props.headerText;

    let stickyMenu = (
      <Sticky innerZ={1} enabled={true}>
        <div id={layoutStyles.menu}>
          <Link className={layoutStyles.logoText} to="/">
            Aleksandar Popović
          </Link>
          <Link to="/blog">
            <div>blog</div>
          </Link>
          <Link to="/projects">
            <div>projects</div>
          </Link>
          <Link to="/">
            <div>about me</div>
            </Link>
          <Link to="/contact">
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
      <div className={layoutStyles.headerText}>{headerText}</div>
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
          © {new Date().getFullYear()}, Built with <a href="https://www.gatsbyjs.org">Gatsby</a>, by Aleks Popović
        </footer>
      </div>
    )
  }
}

export default Layout
