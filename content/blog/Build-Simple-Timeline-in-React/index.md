---
title: "Build Simple Timeline in React"
date: "2020-11-22"
description: "A lot of portfolio websites today have some sort of a timeline which can be used in different ways. You can showcase your job and education history, past projects, your blog posts and everything else that can be structured in a timeline. You can potentially build this on your own, or you can use one of the existing plugins which are very easy to setup and look pretty good out of the box. I will show you one of those plugins and an example of how you can generate all elements with some simulated data and you will have your own timeline in no time."
tags:
  - web
  - react
featuredImage: timeline.png
---

A lot of portfolio websites today have some sort of a timeline which can be used in different ways. You can showcase your job and education history, past projects, your blog posts and everything else that can be structured in a timeline. You can potentially build this on your own, or you can use one of the existing plugins which are very easy to setup and look pretty good out of the box. I will show you one of those plugins and an example of how you can generate all elements with some simulated data and you will have your own timeline in no time.

If you prefer a video version you can watch me build this on Youtube:

<iframe width="560" height="315" src="https://www.youtube.com/embed/rnkToU2_lw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

I started a new React app by running create-react-app command in my working folder.

```
create-react-app timeline
```

The plan is to build a Component which can pull all of our job and education history, including titles, dates, descriptions etc. and programmatically create a timeline out of it. I will simulate a database by using a separate JavaScript file which exports an array of objects containg all data, but you can use whatever you have available, or just use mine. Here is what the file timelineElements.js looks like:

```js
let timelineElements = [
  {
    id: 1,
    title: "Frontend Developer",
    location: "Dragontail, Ascana",
    description:
      "Converting data to a graphical interface, through the use of HTML, CSS, and JavaScript, so that users can view and interact with that data.",
    buttonText: "View Frontend Projects",
    date: "August 2016 - present",
    icon: "work",
  },
  {
    id: 2,
    title: "Backend Developer",
    location: "Skystead, Craonia",
    description:
      "Working hand-in-hand with front-end developers by providing the outward facing web application elements server-side logic. Creating the logic to make the web app function properly, and accomplishing this through the use of server-side scripting languages.",
    buttonText: "View Backend Projects",
    date: "June 2013 - August 2016",
    icon: "work",
  },
  {
    id: 3,
    title: "Quality Assurance Engineer",
    location: "South Warren, Geshington",
    description:
      "Assessing the quality of specifications and technical design documents in order to ensure timely, relevant and meaningful feedback.",
    buttonText: "Company Website",
    date: "September 2011 - June 2013",
    icon: "work",
  },
  {
    id: 4,
    title: "Oak Ridge College",
    location: "South Warren, Geshington",
    description:
      "Online Course in Magical Beasts and Wonders of the World - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque sagittis tellus, non ultrices lacus tempus vel.",
    buttonText: "Course Certificate",
    date: "September 2011",
    icon: "school",
  },
  {
    id: 5,
    title: "Hawking College",
    location: "Skystead, Craonia",
    description:
      "College - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque sagittis tellus, non ultrices lacus tempus vel.",
    buttonText: "College Projects",
    date: "2007 - 2011",
    icon: "school",
  },
  {
    id: 6,
    title: "Marble Hills Grammar School",
    location: "Dragontail, Ascana",
    description:
      "Highschool - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque sagittis tellus, non ultrices lacus tempus vel.",
    date: "2003 - 2007",
    icon: "school",
  },
]

export default timelineElements
```

As our data is going to contain previous jobs and school information we will need two separate icons to display it. I found a couple of svg icons online - pc monitor for jobs, and college hat for education.

We also need to install the timeline plugin by running the npm command:

```js
npm i react-vertical-timeline-component
```

Since this is a simple project I am going to put everything inside of the App component except for the css which will go into a separate App.css file. To start of we need to import the plugin, data file and our svg icons.

```jsx
import "./App.css"
import { ReactComponent as WorkIcon } from "./work.svg"
import { ReactComponent as SchoolIcon } from "./school.svg"

import timelineElements from "./timelineElements"

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component"

import "react-vertical-timeline-component/style.min.css"

function App() {
  return (
    <div>
      <h1 className="title">Timeline</h1>
      <VerticalTimeline></VerticalTimeline>
    </div>
  )
}

export default App
```

We need to map out our data file into timeline elements.

```jsx
import "./App.css"
import { ReactComponent as WorkIcon } from "./work.svg"
import { ReactComponent as SchoolIcon } from "./school.svg"

import timelineElements from "./timelineElements"

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component"

import "react-vertical-timeline-component/style.min.css"

function App() {
  return (
    <div>
      <h1 className="title">Timeline</h1>
      <VerticalTimeline>
        // highlight-start
        {timelineElements.map(element => {
          return (
            <VerticalTimelineElement
              key={element.key}
              date={element.date}
              dateClassName="date"
            >
              <h3 className="vertical-timeline-element-title">
                {element.title}
              </h3>
              <h5 className="vertical-timeline-element-subtitle">
                {element.location}
              </h5>
              <p id="description">{element.description}</p>
            </VerticalTimelineElement>
          )
        })}
        // highlight-end
      </VerticalTimeline>
    </div>
  )
}

export default App
```

The timeline plugin gives us an option to set up an object for the icon styles, and we can use this to set a different icon with different styles based on the type of icon defined in the file.

```jsx
import "./App.css"
import { ReactComponent as WorkIcon } from "./work.svg"
import { ReactComponent as SchoolIcon } from "./school.svg"

import timelineElements from "./timelineElements"

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component"

import "react-vertical-timeline-component/style.min.css"

function App() {
  // highlight-start
  let workIconStyles = { background: "#06D6A0" }
  let schoolIconStyles = { background: "#f9c74f" }
  // highlight-end

  return (
    <div>
      <h1 className="title">Timeline</h1>
      <VerticalTimeline>
        {timelineElements.map(element => {
          let isWorkIcon = element.icon === "work"

          return (
            <VerticalTimelineElement
              key={element.key}
              date={element.date}
              dateClassName="date"
              // highlight-start
              iconStyle={isWorkIcon ? workIconStyles : schoolIconStyles}
              icon={isWorkIcon ? <WorkIcon /> : <SchoolIcon />}
              // highlight-end
            >
              <h3 className="vertical-timeline-element-title">
                {element.title}
              </h3>
              <h5 className="vertical-timeline-element-subtitle">
                {element.location}
              </h5>
              <p id="description">{element.description}</p>
            </VerticalTimelineElement>
          )
        })}
      </VerticalTimeline>
    </div>
  )
}

export default App
```

We can also set up a custom button for each of the timeline elements which can also have different styles applied to it depending on the timeline element type.

```jsx
import "./App.css"
import { ReactComponent as WorkIcon } from "./work.svg"
import { ReactComponent as SchoolIcon } from "./school.svg"

import timelineElements from "./timelineElements"

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component"

import "react-vertical-timeline-component/style.min.css"

function App() {
  let workIconStyles = { background: "#06D6A0" }
  let schoolIconStyles = { background: "#f9c74f" }

  return (
    <div>
      <h1 className="title">Timeline</h1>
      <VerticalTimeline>
        {timelineElements.map(element => {
          let isWorkIcon = element.icon === "work"
          // highlight-start
          let showButton =
            element.buttonText !== undefined &&
            element.buttonText !== null &&
            element.buttonText !== ""
          // highlight-end

          return (
            <VerticalTimelineElement
              key={element.key}
              date={element.date}
              dateClassName="date"
              iconStyle={isWorkIcon ? workIconStyles : schoolIconStyles}
              icon={isWorkIcon ? <WorkIcon /> : <SchoolIcon />}
            >
              <h3 className="vertical-timeline-element-title">
                {element.title}
              </h3>
              <h5 className="vertical-timeline-element-subtitle">
                {element.location}
              </h5>
              <p id="description">{element.description}</p>
              // highlight-start
              {showButton && (
                <a
                  className={`button ${
                    isWorkIcon ? "workButton" : "schoolButton"
                  }`}
                  href="/"
                >
                  {element.buttonText}
                </a>
              )}
              // highlight-end
            </VerticalTimelineElement>
          )
        })}
      </VerticalTimeline>
    </div>
  )
}

export default App
```

With that our component is finished and we can move on to the App.css file and apply the rest of our styling.

```css
body {
  background: #3da3d5;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  color: rgb(53, 53, 53);
}

.title {
  font-size: 15em;
  text-align: center;
  font-family: "Bebas Neue", sans-serif;
}

h3 {
  padding-top: 0.25em;
}

.vertical-timeline-element-content {
  box-shadow: 0 0.25em 0.5em 0 rgba(0, 0, 0, 0.25), 0 0.4em 1.25em 0 rgba(0, 0, 0, 0.15) !important;
  padding: 2em 3em !important;
}

.date {
  color: rgb(201, 251, 255);
}

#description {
  margin: 1.5em 0 2em 0;
}

.button {
  text-decoration: none;
  padding: 0.5em 1em;
  border-radius: 5px;
  color: white;
}

.workButton {
  background-color: #06d6a0;
}

.workButton:hover {
  background-color: #0ac593;
}

.schoolButton {
  background-color: #f9c74f;
}

.schoolButton:hover {
  background-color: #f3bc3c;
}
```

I've made the date text a very light blue color which becomes a bit unreadable once we switch to a screen width lower than 1700px. We can fix this along with its awkward positioning by using a simple media rule.

```css
@media only screen and (max-width: 1700px) {
  .vertical-timeline-element-date {
    display: block !important;
    float: none !important;
    color: rgb(44, 44, 44);
    margin-top: 1.5em;
  }
}
```

If you followed along successfully you should now have a prototype of a simple, yet versatile timeline. The plugin itself allows you to add and switch many different things. For full documentation take a look at its <a href="https://www.npmjs.com/package/react-vertical-timeline-component" target="_blank" rel="noopener noreferrer">official npm page</a>.

You can find the full code on my <a href="https://github.com/alekspopovic/simple-react-timeline" target="_blank" rel="noopener noreferrer">GitHub</a>.

If you have any questions or comments you can reach out to me on <a href="https://twitter.com/alekswritescode" target="_blank" rel="noopener noreferrer">Twitter</a> and <a href="https://www.instagram.com/aleks.popovic/" target="_blank" rel="noopener noreferrer">Instagram</a>, where I also post interesting code tidbits and designs.

I also regularly upload React and web dev tutorials to Youtube, so if that's your cup of tea feel free to support me by subscribing to <a href="https://www.youtube.com/channel/UCu3RVedqyL5o776xyQlbyAw" target="_blank" rel="noopener noreferrer">my channel</a>.
