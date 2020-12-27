---
title: "How to Integrate dev.to with Gatsby"
date: "2020-12-27"
description: My website is build on top of Gatsby, which is a React-based open source framework with performance, scalability and security built-in". It's a fast growing platform with a very active comunity and it has a plethora of plugins which you can use to customize your website. It's also a static website generator, which introduces certain limitations.
tags:
  - web
  - react
  - gatsby
featuredImage: integration.png
---

My website is build on top of Gatsby, which is a "React-based open source framework with performance, scalability and security built-in". It's a fast growing platform with a very active comunity and it has a plethora of plugins which you can use to customize your website. It's also a static website generator, which introduces certain limitations.

Static site means no dynamic content. No dynamic content means no comments, likes, bookmarks or similar blog post functionalities that would require a back-end with a database. Not by default at least.

There are ways to implement all those things on a static website, but I am currently way too lazy to do that. Instead, I went for a partial, but still cool looking solution.

I cross-post most of my blog posts on dev.to and dev.to blog posts certainly have an implementation for comments and likes (which they call reactions, because there are 3 different kinds). So, I just steal those.

<img src="/blog.png" alt="my blog with dev.to icons"/>

When I say "steal", I actually mean: "There is a Gatsby plugin which allows me to use dev.to API without setting up any API interaction on my end except for passing in my dev.to username". It is a bit limited, mind you. For example, you can get the number of comments, but not the actual comments. You can get the total number of reactions, but not individual Hearts, Unicorns and Saved/Bookmarked counts.

Which is fine in my book, for now. It gets the job done and it looks nice. If you have a Gatsby blog and want to do something similar here is how you can do it.

The plugin in question is <a href="https://www.npmjs.com/package/gatsby-source-dev" target="_blank" rel="noopener noreferrer">gatsby-source-dev</a> which you can install by running one of these commands:

```
yarn add gatsby-source-dev
npm install gatsby-source-dev
```

We also need to add this in the plugins section of the gatsby-config.js file:

```
{
  resolve: "gatsby-source-dev",
  options: {
    username: "alekswritescode",
  },
},
```

Of course, instead of "alekswritescode" you would add your own dev.to username.

For the next part of the setup I followed an <a href="https://dev.to/justinjunodev/add-a-dev-to-blog-feed-to-your-gatsby-site-in-5-mins-168n" target="_blank" rel="noopener noreferrer">article written by Justin Juno</a>, where he excellently explains how to add an entire dev.to feed to your Gatsby website in just 5 minutes. But, I don't want an entire feed. I just need the comment and reaction count, and I'm out.

In his article Justin explains how to add your own custom hook which will pull the data from dev.to API. I modified it a bit, so my hook's code ended up looking like this:

```js
// usePosts.js

import { graphql, useStaticQuery } from "gatsby"

const usePosts = () => {
  const data = useStaticQuery(graphql`
    query {
      allDevArticles {
        edges {
          node {
            article {
              title
              positive_reactions_count
              comments_count
            }
          }
        }
      }
    }
  `)

  return data.allDevArticles.edges.map(post => ({
    id: post.node.article.id,
    title: post.node.article.title,
    likes: post.node.article.positive_reactions_count,
    comments: post.node.article.comments_count,
  }))
}

export default usePosts
```

Like I said, I only need reactions and comments, and the id is being fetched by default. I am also pulling the post title so I can compare it against my post titles and determine where my "stolen" comments and reactions need to go.

Now we need to call that hook inside of your blog and/or blog post template. I am not going to post my full code here, since your blog implementation is almost certainly different from mine, but here is the general idea of what you can do.

```jsx
// blog.js

import usePosts from "../hooks/usePosts"
import Impressions from "../components/impressions"

function Blog(props) {
  const posts = props.data.allMarkdownRemark.edges
  const devToPosts = usePosts()

  return (
    <div id="content">
      {posts.map(({ node }) => {
        let devToArticle = devToPosts.filter(
          article =>
            article.title.toLowerCase() === node.frontmatter.title.toLowerCase()
        )[0]

        let likes = 0
        let comments = 0

        if (devToArticle) {
          likes = devToArticle.likes
          comments = devToArticle.comments
        }

        return (
          <article key={node.fields.slug}>
            // all of your blog post code goes here
            <Impressions likes={likes} comments={comments} />
          </article>
        )
      })}
    </div>
  )
}

export default Blog
```

So, what's going on in there? We are importing our hook and a component which will show the number of likes and comments. I will show you how to implement that component as well in a minute. We are then picking up all of our blog post data that's in my case being sent from the gatsby-node.js. Your implementation may be different, so I won't go over setting that up in this article.

We are then mapping our posts into article elements which contain our blog post data. But, before that, we are checking if one of our articles has a title that matches an article from dev.to feed. I name all of my cross-posted articles the same way, so there should always be one match which we can pick up. We pick up likes and comments and pass them into the Impressions component.

Speaking of the Impressions component, here is what that looks like:

```jsx
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
```

In here we are just picking up the number of likes and comments and displaying them alongside an SVG icon if they are greater than zero. The SVG icons are the same ones used on dev.to for comments and "Heart" reactions. If you are wondering where I got those from - you can find these and many more on the <a href="https://remixicon.com/" target="_blank" rel="noopener noreferrer">RemixIcon</a> website. Those are the icons dev.to uses and I wanted to set up the same on my end since I am pulling their data, after all. I wanted a bit of consistency there. Plus, they look super cool, so why not. Don't sue me, please.

I added some simple CSS to make everything nice and centered:

```css
.impressions {
  display: flex;
  justify-content: center;
}

.impression {
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
  font-size: 1rem;
}

.impressionIcon {
  margin-right: 0.4rem;
  fill: #fd9047;
}
```

Of course, you would have your own custom CSS to match this component with the rest of your blog post content and you would position the component acordingly. I placed mine right below the post title and date.

After that I did the same thing for my template for individual blog posts. The code is pretty much the same, except you you are working with individual blog posts so you don't need to map through all of them. Just pick up your post's title, compare it with your dev.to articles and you are set.

<img src="/blogPost.png" alt="blog post example with dev.to icons"/>

One caveat with this approach is that your blog post data won't be updated in real time. Since you need to build out your Gatsby website before deploying the static content you will just get a snapshot of that data during the build. This might be important for you, but I don't mind it that much. I am regularly pushing updates to my website since it's a constant work in progress. When I push a new build my website catches up to whatever is happening with the dev.to version of the blog post.

<hr>

If you have any questions or comments you can reach out to me on <a href="https://twitter.com/alekswritescode" target="_blank" rel="noopener noreferrer">Twitter</a> and <a href="https://www.instagram.com/aleks.popovic/" target="_blank" rel="noopener noreferrer">Instagram</a>, where I also post interesting code tidbits and designs.

I also have a <a href="https://www.youtube.com/AleksPopovic" target="_blank" rel="noopener noreferrer">YouTube channel</a> where I regularly upload React and web dev tutorials, so if that's your cup of tea feel free to support me by subscribing.
