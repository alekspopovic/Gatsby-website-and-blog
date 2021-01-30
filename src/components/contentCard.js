import React from "react"
import Img from "gatsby-image"
import Link from "gatsby-link"
import cardStyles from "../styles/contentCard.module.css"

function ContentCard(props) {
  const {
    slug,
    title,
    subTitle,
    date,
    content,
    image,
    buttonText,
    buttonUrl,
    tags,
    isInternal,
  } = props

  let subTitleText = subTitle ? (
    <div className={cardStyles.subtitle}>{subTitle}</div>
  ) : null

  let titleText

  if (slug) {
    titleText = (
      <Link to={slug}>
        <div>{title}</div>
        {subTitleText}
      </Link>
    )
  } else {
    titleText = (
      <div>
        <div>{title}</div>
        {subTitleText}
      </div>
    )
  }

  let tagsHtml

  if (tags) {
    tagsHtml = (
      <div className={cardStyles.tags}>
        {tags.map(tag => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    )
  }

  let imageHtml

  if (image.srcSet) {
    imageHtml = <Img className={cardStyles.imageContainer} fluid={image} />
  } else {
    imageHtml = (
      <img
        className={cardStyles.imageContainer}
        src={image}
        alt="post thumbnail"
      />
    )
  }

  let buttonLinkHtml = isInternal ? (
    <Link to={buttonUrl}>{buttonText}</Link>
  ) : (
    <a href={buttonUrl}>{buttonText}</a>
  )

  return (
    <article className={cardStyles.contentCard}>
      {imageHtml}
      <header>
        <h1>{titleText}</h1>
        <div className={cardStyles.date}>{date}</div>
      </header>
      <section>
        <p
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
        {tagsHtml}
        <div className={cardStyles.button}>{buttonLinkHtml}</div>
      </section>
    </article>
  )
}

export default ContentCard
