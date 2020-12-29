---
title: "How to build Netflix's Coming Soon page in React"
date: "2020-11-02"
description: "A couple of days ago I noticed something interesting in the Netflix mobile app. It has a Coming Soon page which shows movies and TV shows that are soon coming to Netflix. It has a few interesting functionalities. It's loading data from somewhere and sorting it into cards. You can bookmark a movie to let Netflix know you want to be notified when it comes out. It has a cool, modern looking share menu for which you need to manage state."
tags:
  - web
  - react
featuredImage: netflix.png
---

A couple of days ago I noticed something interesting in the Netflix mobile app. It has a Coming Soon page which shows movies and TV shows that are soon coming to Netflix.

It has a few interesting functionalities. It's loading data from somewhere and sorting it into cards. You can bookmark a movie to let Netflix know you want to be notified when it comes out. It has a cool, modern looking share menu for which you need to manage state.

What's interesting is - this page is not available outside of their mobile app - so you can't find it on your desktop or TV, and that got me thinking, wouldn't it be cool to recreate it for web?

So, that's what we are doing today. I am going to show you how you can recreate Netflix's Coming Soon page in React, and I will show you some interesting concepts that you can adapt and use in your other React projects, like handling and rendering data, using state hooks, and sharing states between your components. The whole project is a bit too lengthy to fit into a single blog post, but you can check out the video version with full instructions and explanations on Youtube:

<iframe width="560" height="315" src="https://www.youtube.com/embed/lEXc1UTTLzc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<hr>

<div class="sectionHighlight">If you have any questions or comments you can reach out to me on <a href="https://twitter.com/alekswritescode" target="_blank" rel="noopener noreferrer">Twitter</a> and <a href="https://www.instagram.com/aleks.popovic/" target="_blank" rel="noopener noreferrer">Instagram</a>, where I also post interesting code tidbits and designs.

I also have a <a href="https://www.youtube.com/AleksPopovic" target="_blank" rel="noopener noreferrer">YouTube channel</a> where I regularly upload React and web dev tutorials, so if that's your cup of tea feel free to support me by subscribing.</div>
