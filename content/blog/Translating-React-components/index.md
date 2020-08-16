---
title: "Translating React components"
series: "How to Build a Multilingual Website with Gatsby and React"
seriesLink: "multilingual"
date: "2020-08-16"
description: "Having different page files for different languages makes all of the page translations pretty contained and easy for access if something needs to be changed or added later on. Separating page components is good because of searching algorithms and SEO. There is also no code duplication, since page components are mostly plain text or markdown. Non-page components are a bit different."
tags:
  - web
  - react
  - multilingual
featuredImage: map.jpg
---

Having different page files for different languages makes all of the page translations pretty contained and easy for access if something needs to be changed or added later on. Separating page components is good because of searching algorithms and SEO. There is also no code duplication, since page components are mostly plain text or markdown. Non-page components are a bit different.

Let's say you want to translate your main navigation menu, which is a React component. There is no point in duplicating one component per language, especially if you plan to support more than two languages. Adding any changes to the component in question would create huge amount of footwork which would become a maintenance nightmare.

## Setting up data

One solution would be to make a separate file which is going to house all of our translated data for a particular component. We can set it up so each language's data is easily accessible and we can pull and render proper text on each page based on our current page's language. This will make it easy to write logic that handles the language switch and it will make translating any additional content more manageable.

I created a new folder called data and added a new file to it called menuLabels.js which is going to contain all of my navigation labels. Let's say the menu has only a few options for simplicity.

```jsx
const labels = {
  en: {
    home: "home",
    registration: "registration",
    news: "news",
    contact: "contact",
  },
  el: {
    home: "ΑΡΧΙΚΗ",
    registration: "ΕΓΓΡΑΦΗ",
    news: "ΝΕΑ",
    contact: "ΕΠΙΚΟΙΝΩΝΙΑ",
  },
}

export default labels
```

We export an object called labels, which has language codes as keys, and objects as values, which in turn have key-value pairs such as shown above. The keys need to match between sub-objects because you are going to reference them when deciding which value to show. If you decide to add more menu items, or to support additional languages - no problem, just add new keys and values following this pattern.

## Getting data

Let's say we already have a bare-bones Menu component with hard-coded text values in English:

```jsx
import React from "react"
import { Link } from "gatsby"

const Menu = () => {
  return (
    <div>
      <Link to="/">home</Link>
      <Link to="registration">registration</Link>
      <Link to="news">news</Link>
      <Link to="contact">contact</Link>
    </div>
  )
}

export default Menu
```

Now we need to import the data file and figure out how to get the correct label from it.

```jsx
import React from "react"
import { Link } from "gatsby"
// highlight-next-line
import labels from "../data/menuLabels"

// highlight-start
const Menu = props => {
  const { language } = props
  const translations = labels[language]
  // highlight-end

  return (
    <div>
      // highlight-start
      <Link to="/">{translations["home"]}</Link>
      <Link to="registration">{translations["registration"]}</Link>
      <Link to="news">{translations["news"]}</Link>
      <Link to="contact">{translations["contact"]}</Link>
      // highlight-end
    </div>
  )
}

export default Menu
```

First of all, the component needs to accept a language parameter in order for us to know which labels to show. You need to make sure this parameter is passed in as an appropriate language code, like we did in other components in previous parts of this series (e.g. "en" for English).

After that it's easy to get the sub-object based on the language code key, and get the labels from it by passing in label names that match those in the data file.

## Generating Urls

The last thing we need to do is adding logic for generating a proper Url for each item., since we can't leave those hard-coded. Here is what the final code would look like:

```jsx
import React from "react"
import { Link } from "gatsby"
import labels from "../data/menuLabels"

const Menu = props => {
  const { language } = props
  const translations = labels[language]

  // highlight-start
  const formatMenuUrl = item => {
    if (language === "en") {
      return item
    }

    return `/${language}/${item}`
  }
  // highlight-end

  return (
    <div>
      // highlight-start
      <Link to={formatMenuUrl("")}>{translations["home"]}</Link>
      <Link to={formatMenuUrl("registration")}>
        {translations["registration"]}
      </Link>
      <Link to={formatMenuUrl("news")}>{translations["news"]}</Link>
      <Link to={formatMenuUrl("contact")}>{translations["contact"]}</Link>
      // highlight-end
    </div>
  )
}

export default Menu
```

We added a simple function which accepts a menu item as a parameter and checks the language. If the language is English we don't need to add a prefix to the Url, since we have previously set up English to not use a prefix as our default language in [Part #1 of the series](/Setting-up-page-structure-for-a-multilingual-website-in-Gatsby-and-React/). Otherwise we add a prefix to our Urls. This makes adding new languages extremely easy to implement later if necessary.

## Other implementations

That's it, for this component at least, but you can apply a similar principle to other use-cases as well. Most components will just require that you pull an appropriate label from the file without any additional logic.

For example, you can apply this to a contact form component by pulling labels and input placeholders.

If you have a custom button component which you use all over your application you can easily translate your buttons' text this way.

In case you are making a personal multilingual website you could even translate your whole CV or a portfolio page by combining techniques discussed in all three parts of this series. Possibilities are almost endless - depending on how many languages are you willing to support.

If you've followed through the [whole series](/tags/multilingual) (or at least parts of it that you needed) - you should now have a working multilingual website with a customizable language switch, component and page translations. Regardless of what is your development stack you now have a lot of flexibility with how to further set up your pages and components.
