---
title: "Building a language switch component in React"
series: "How to Build a Multilingual Website with Gatsby and React"
seriesLink: "multilingual"
date: "2020-08-14"
description: "You have all of your multilingual pages set up, but now you need to give your users a way to access those pages. There are multiple ways this can be done. The most common solution is adding a language selection tool in the form of multiple links or by using a drop-down list. In my case - I had to implement three different languages, so I went with the buttons approach."
tags:
  - web
  - react
  - multilingual
featuredImage: switch.png
---

You have all of your multilingual pages set up, but now you need to give your users a way to access those pages. There are multiple ways this can be done. The most common solution is adding a language selection tool in the form of multiple links or by using a drop-down list.

In my case - I had to implement three different languages, so I went with the buttons approach.

First things first - we need to create a new component called LanguageSwitch (or whatever you find to be more appropriate for your use-case).

```jsx
import React from "react"

const LanguageSwitch = ({ language, location }) => {
  return <div></div>
}

export default LanguageSwitch
```

The component takes in two parameters. Language is the language code string that you can pass in on each page. Location is the standard location prop that every page component in Gatsby has access to. Here is how you can grab it and pass it down on a default home page.

```jsx
import React from "react"
import LanguageSwitch from "../components/languageSwitch"

class Index extends React.Component {
  render() {
    return <LanguageSwitch language="en" location={this.props.location} />
  }
}

export default Index
```

For showing the language Urls I wanted to make a system that displays only the languages that should be available for clicking, since having three buttons visible all the time would be a bit cluttered. So, if the user was currently on an English page he would see the buttons for other two languages, but not the English one.

For that to work I would need a way to reference available languages by their language code and display appropriate label on the button, so this is what I did.

```jsx
import React from "react"

const LanguageSwitch = ({ language, location }) => {
  // highlight-next-line
  let languageList = { sr: "srpski", en: "English", el: "Ελληνικα" }

  // highlight-next-line
  let links = []

  // highlight-next-line
  return <div>{links}</div>
}

export default LanguageSwitch
```

I added an object which keys were the language codes, and the values were the button or link labels. I also added an array for storing the links and returning them to the page once we figure out which ones need to be shown. Next thing was figuring out the page Url for each button.

```jsx
import React from "react"

const LanguageSwitch = ({ language, location }) => {
  let languageList = { sr: "srpski", en: "English", el: "Ελληνικα" }

  let links = []

  let pageName = location.pathname

  // highlight-start
  if (pageName.includes("/el") || pageName.includes("/sr")) {
    pageName = pageName.split("/")[2]
  }
  // highlight-end

  return <div>{links}</div>
}

export default LanguageSwitch
```

Let's say we open up the contact page with Greek content. The location.pathname will be _/el/contact/_. Splitting that string gives us an array with four items.

```jsx
exampleArray = ["", "el", "contact", ""]
```

The page name is the value with index of 2, so that's what we grab. If we were currently on the English contact page (which in my case doesn't have the language code prefix) then location.pathname would equal to _/contact/_ and that's exactly what we want. There is no need to extract the page from that string, so that's why we add a condition before the split.

The only thing left to do is generating the appropriate Urls.

```jsx
import React from "react"
import { Link } from "gatsby"

const LanguageSwitch = ({ language, location }) => {
  let languageList = { sr: "srpski", en: "English", el: "Ελληνικα" }

  let links = []

  let pageName = location.pathname

  if (pageName.includes("/el") || pageName.includes("/sr")) {
    pageName = pageName.split("/")[2]
  }

  // highlight-start
  for (var key in languageList) {
    if (key !== language) {
      let languagePath = ""
      // highlight-end

      // highlight-start
      if (key !== "en") {
        languagePath = `/${key}/`
      }
      // highlight-end

      // highlight-start
      let link = (
        <Link key={key} to={`${languagePath}${pageName}`}>
          {languageList[key]}
        </Link>
      )
      // highlight-end

      // highlight-start
      links.push(link)
    }
  }
  // highlight-end

  return <div>{links}</div>
}

export default LanguageSwitch
```

We go through the languageList object to check if the Url needs to be generated. For English pages we don't need to add a prefix, but for other languages we set languagePath to the appropriate language key code.

Then we create a new Link, which is a built-in Gatsby component used for linking internal pages. Link's "to" property is what we would add as "src" in a regular &lt;a> tag. In this case we combine the language key code and the page name which we found earlier. Between the Link tags we add our link's text, which is in this case the language label that we get from the languageList object.

In the end we push the link to our return array and that's it. Of course, the links are going to have your default Url styling since we didn't add any specific css to them, but you can always set them up however you want by adding some css.

## Simpler solution

What if you don't want a language switch with a huge number of buttons because you are implementing only 2 different languages? Then there's probably no need to go to the trouble of hiding any buttons, and you can just show both choices at the same time. I ended up doing this in the end since client's requirements changed and they wanted only English and Greek options.

Here is what that code would look like.

```jsx
import React from "react"
import { Link } from "gatsby"

const LanguageSwitch = ({ location }) => {
  let pageName = location.pathname

  if (pageName.includes("/el")) {
    pageName = pageName.split("/")[2]
  }

  let greekPagePath = `/el/${pageName}`

  return (
    <div>
      <Link to={pageName}>English</Link>
      <Link to={greekPagePath}>Ελληνικα</Link>
    </div>
  )
}

export default LanguageSwitch
```

Much simpler. First of all, we don't need to pass in the language as a parameter any more, because we don't need to hide any options. We also don't need an object with all language key codes and labels. We pick up the location.pathname for the English pageName and we split it for the Greek version as before. Then we simply return both Links since we don't have to go through a loop.

## Country flags instead of labels

If you want to use flag images as buttons instead of language labels, you can do that too. Just import your images, replace them with labels and you should end up with something like this:

```jsx
import React from "react"
import { Link } from "gatsby"
// highlight-start
import greekFlag from "../assets/greece.svg"
import ukFlag from "../assets/uk.svg"
// highlight-end

const LanguageSelector = ({ location }) => {
  let pageName = location.pathname

  if (pageName.includes("/el")) {
    pageName = pageName.split("/")[2]
  }

  let greekPagePath = `/el/${pageName}`

  return (
    <div>
      <Link to={pageName}>
        // highlight-next-line
        <img src={ukFlag} alt="english language" />
      </Link>
      <Link to={greekPagePath}>
        // highlight-next-line
        <img src={greekFlag} alt="greek language" />
      </Link>
    </div>
  )
}

export default LanguageSelector
```

You will probably need to adjust the way your images are rendered with some additional css, but that's a completely different topic.

## What's next?

So far so good. We have set up our page structure one way or another and we have a component that can handle switching our website's language. Our page and component translations are still not set up and this is something we will cover in the [last part of this series](/Translating-React-components/). We will go over a couple of examples explaining what are some easy ways to set up our language data to be accessible throughout all of our pages. We will also cover how to translate regular components, such as a main navigation menu.
