import React from "react"
import impressionsStyles from "../styles/impressions.module.css"

export default function Impressions(props) {
  const { likes, comments } = props

  return (
    <div className={impressionsStyles.impressions}>
      {likes > 0 && (
        <div className={impressionsStyles.impression}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className={impressionsStyles.impressionIcon}
          >
            <title>DEV.to impressions</title>
            <path d="M20.243 4.757c2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236C5.515 3 8.093 2.56 10.261 3.44L6.343 7.358l1.414 1.415L12 4.53l-.013-.014.014.013c2.349-2.109 5.979-2.039 8.242.228z" />
          </svg>
          {likes}
        </div>
      )}
      {comments > 0 && (
        <div className={impressionsStyles.impression}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className={impressionsStyles.impressionIcon}
          >
            <title>DEV.to comments</title>
            <path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10H2l2.929-2.929A9.969 9.969 0 0 1 2 12zm4.828 8H12a8 8 0 1 0-8-8c0 2.152.851 4.165 2.343 5.657l1.414 1.414-.929.929zM8 13h8a4 4 0 1 1-8 0z" />
          </svg>
          {comments}
        </div>
      )}
    </div>
  )
}
