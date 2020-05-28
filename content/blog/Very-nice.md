---
title: My Second Post! 3
date: "2020-03-06T23:46:37.121Z"
description: "Quisque erat sapien, vulputate id faucibus ut, auctor at lorem. In vestibulum lectus tortor, id tristique orci euismod vitae. Nulla vel dui placerat, congue dolor sed, dapibus lacus. Maecenas purus magna, rhoncus eget libero sed, porta auctor ex. Nunc iaculis pellentesque libero. Fusce eget pretium est. Aenean vel lectus scelerisque, sagittis odio eget, congue orci."
tags:
  - c#
  - gatsby
---

```jsx
class ProjectCard extends React.Component {
  render() {
    const {
      name,
      imageUrl,
      tags,
      description,
      url,
      itchIoUrl,
      playStoreUrl,
    } = this.props.project
    const floatRight = this.props.floatRight

    let floatRightClass = ""

    if (floatRight === true) {
      floatRightClass = projectCardStyles.floatRight
    }

    let buttonUrl = ""
    let buttonText = ""

    if (url) {
      buttonUrl = url
      buttonText = "Visit Website"
    } else if (itchIoUrl) {
      buttonUrl = itchIoUrl
      buttonText = "View on Itch.io"
    } else if (playStoreUrl) {
      buttonUrl = playStoreUrl
      buttonText = "View on Android Playstore"
    }

    return (
      <div className={`${projectCardStyles.card} ${floatRightClass}`}>
        <div className={projectCardStyles.name}>{name}</div>

        <div className={projectCardStyles.content}>
          <img src={imageUrl} alt={name} />
          <div className={projectCardStyles.text}>
            <div className={projectCardStyles.description}>{description}</div>
            <div className={projectCardStyles.tags}>
              {tags.map(tag => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className={projectCardStyles.cardButton}>
          <a target="_blank" rel="noopener noreferrer" href={buttonUrl}>
            {buttonText}
          </a>
        </div>
      </div>
    )
  }
}
```

```html
<div className="{projectCardStyles.cardButton}">
  <a target="_blank" rel="noopener noreferrer" href="{buttonUrl}">
    {buttonText}
  </a>
</div>
```

```css
video {
  min-width: 100%;
  min-height: 100%;
  max-width: 100%;
  z-index: -100;
  background-size: cover;
  overflow: hidden;
  opacity: 0.75;
}
```

Wow! I love blogging so much already.

Did you know that "despite its name, salted duck eggs can also be made from
chicken eggs, though the taste and texture will be somewhat different, and the
egg yolk will be less rich."?
([Wikipedia Link](http://en.wikipedia.org/wiki/Salted_duck_egg))

Yeah, I didn't either.
