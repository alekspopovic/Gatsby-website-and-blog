---
title: "How to build a multilingual website with Gatsby and React"
subtitle: "Part 1: Page Structure"
date: "2020-08-05"
description: "I started working on this website in January, but things didn't really work out the way I wanted to. It's tough to have everything go according to plan when you don't have a plan in the first place. I knew I wanted to redesign my old website which was was just one static page with a list of my projects. At the time I made it that was enough, but I wanted to extend it at some point to be a place where I can do and show more things, not necessarily related to web development. I guess this is that point."
tags:
  - gatsby
  - web
  - react
featuredImage: keyboard.jpg
---

Before going ahead and making a multilingual website I would advise you to think about a few things:

- Do you even need one?
- Are you prepared to make multilingual content on your own?
- What is the best way to handle various translations?

The first two points really matter only if you are making a personal project. If you were contracted to make a multilingual site for someone else then they are the ones who need to think about it.

I was recently hired to make a multilingual website with at least three different language options and point #3 was something I had to think about for a bit. Here is how I solved it with Gatsby and React, and maybe it can ispire you to make a similar solution for your own project.

## Page setup for Gatsby

There is a very handy Gatsby plugin for setting up different multilingual pages called [gatsby-plugin-i18n](https://github.com/angeloocana/gatsby-plugin-i18n). It basically works by looking at your page files' names and assigning a route to them based on a pattern.

Let's say you have a page called contact.js which has a path that looks like this: src/pages/about.js . To add different language versions of that page you need to change the file name by adding the language code to it.

For example, changing the file path to src/pages/about.en.js will change the final page url from yourwebsite.com/about to yourwebsite.com/en/about . Now to add the same page for a different language, let's say German, you would make another file with a path like this: src/pages/about.de.js, which would make the final url look like this: yourwebsite.com/de/about .

As you can already tell, this is pretty useful, and easy to setup. Of course - the plugin doesn't actually translate the page content. It "just" automatically sets up all of your page routing based on your page names, which is really neat.

## Installation

To install the plugin you can run

```jsx
npm install gatsby-plugin-i18n
```

or

```jsx
yarn add gatsby-plugin-i18n
```

## Configuration

For the most basic setup you will need to edit your gatsby-config.js file and add this to it:

```jsx
plugins: [
  {
    resolve: "gatsby-plugin-i18n",
    options: {
      langKeyDefault: "en",
      useLangKeyLayout: false,
    },
  },
]
```

You can fine-tune your settings by editing the options object. I went with these settings in the end, but you can find all possible options on the plugin's [repo page](https://github.com/angeloocana/gatsby-plugin-i18n#all-options) and play around with them.

```jsx
plugins: [
  {
    resolve: `gatsby-plugin-i18n`,
    options: {
      langKeyDefault: "en",
      langKeyForNull: "en", // Sets language key to "en" if it's not provided
      prefixDefault: false, // Removes url prefix for your default language
      useLangKeyLayout: false,
    },
  },
]
```

The only thing left is to actually add your pages and fill them with your multilingual content.

## Non-Gatsby approach

If you aren't using Gatsby to build your website there are pure React or even pure JavaScript solutions to your problem. Actually, if you are using pretty much anything else you can head over to [i18next](https://www.i18next.com/overview/supported-frameworks) and check out their list of supported frameworks with full documentation and examples.

## What's next?

Our pages our now configured, but we don't heave an easy way of moving between them. In the next article we will go over the process of making a simple React component for selecting your preferred language, so you don't have to manually enter your page address if you want to switch to a different language.

We will cover a simpler solution for running a bilingual website and also a bit more complex one that supports more than two languages.
