import React from "react"
import { Link } from "gatsby"

const PaginationUrl = (props) => {
    if (!props.test) {
        let url = `${props.url}#content`;
        return (
            <Link className={props.className} to={url}>{props.text}</Link>
        )
    } else {
        return <div>{props.text}</div>
    }
}

export default PaginationUrl
