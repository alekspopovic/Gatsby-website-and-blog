import React from "react"
import { Link } from "gatsby"

class Layout extends React.Component {
  render() {
    const { children } = this.props;
    let header;

    header = (
      <div className="header">
        <Link to="/" className="header-text">Aleksandar Popović</Link>
        <div id="menu">
          <Link className="small-header-text" to="/">Aleksandar Popović</Link>
          <Link to="/about"><div>about me</div></Link>
          <Link to="/projects"><div>projects</div></Link>
          <Link to="/skills"><div>skills</div></Link>
          <Link to="/experience"><div>experience</div></Link>
          <Link to="/contact"><div>contact</div></Link>
        </div>
      </div>	
    )

    return (
      <div>
        <header>{header}</header>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>, by Aleks Popović
        </footer>
      </div>
    )
  }
}

export default Layout
