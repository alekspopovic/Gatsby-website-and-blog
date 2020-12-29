import React from "react"
import ContentCard from "./contentCard"
import styles from "../styles/suggestedReading.module.css"

export default function suggestedReading(props) {
  const { previous, next } = props

  return (
    (previous || next) && (
      <div className={styles.suggestedReadingContainer}>
        <h1 className={styles.header}>
          Here are some more articles you might enjoy
        </h1>
        <div className={styles.suggestedReading}>
          {previous && (
            <ContentCard
              slug={previous.fields.slug}
              title={previous.frontmatter.title}
              date={previous.frontmatter.date}
              content={previous.excerpt}
              image={previous.frontmatter.featuredImage.publicURL}
              buttonText="Continue reading"
              buttonUrl={previous.fields.slug}
              isInternal={true}
            />
          )}
          {next && (
            <ContentCard
              slug={next.fields.slug}
              title={next.frontmatter.title}
              date={next.frontmatter.date}
              content={next.excerpt}
              image={next.frontmatter.featuredImage.publicURL}
              buttonText="Continue reading"
              buttonUrl={next.fields.slug}
              isInternal={true}
            />
          )}
        </div>
      </div>
    )
  )
}
