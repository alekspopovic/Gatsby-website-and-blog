import React from "react"
import layoutStyles from "../styles/layout.module.css"
import { Link } from "gatsby"
import logo from "../assets/logoText.svg"

export default function Navigation() {
  const switchTheme = e => {
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

  let theme

  const windowGlobal = typeof window !== "undefined" && window

  if (windowGlobal.localStorage) {
    theme = windowGlobal.localStorage.getItem("theme")
  }

  let clicked = ""

  if (theme === "light") {
    document.body.classList.add(theme)
    clicked = layoutStyles.clicked
  }

  return (
    <div id={layoutStyles.menu}>
      <Link className={layoutStyles.logoText} to="/">
        <img className={layoutStyles.logoLight} src={logo} alt="icon"></img>
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
        onClick={e => switchTheme(e)}
        className={clicked}
      ></button>
    </div>
  )
}
