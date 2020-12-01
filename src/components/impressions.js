import React from "react"
import impressionsStyles from "../styles/impressions.module.css"

export default function Impressions(props) {
  const { likes, comments } = props

  return (
    <div className={impressionsStyles.impressions}>
      {likes > 0 && (
        <div className={impressionsStyles.impression}>
          <i className={`fa fa-heart ${impressionsStyles.impressionIcon}`}></i>
          {likes}
        </div>
      )}
      {comments > 0 && (
        <div className={impressionsStyles.impression}>
          <i
            className={`fa fa-comments ${impressionsStyles.impressionIcon}`}
          ></i>
          {comments}
        </div>
      )}
    </div>
  )
}
