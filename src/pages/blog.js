import React from "react"
import { Redirect } from "@reach/router"

class Blog extends React.Component {
  render() {
    return <Redirect noThrow to={`/`} />
  }
}

export default Blog
