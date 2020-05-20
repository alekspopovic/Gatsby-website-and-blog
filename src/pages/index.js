import React from "react"
import { Redirect } from "@reach/router"

class Index extends React.Component {
  render() {
    return <Redirect noThrow to={`/blog`} />
  }
}

export default Index
