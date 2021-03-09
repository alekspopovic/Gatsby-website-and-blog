---
title: "Radio Player App in React"
date: "2021-03-09"
description: "Sometimes you gotta do what you gotta do. For quite a while I've had this idea of making a radio player or an app which you could use to search up or browse different radio stations, but something else always came first. The holidays, job, working on other projects, but I finally got around to doing it."
tags:
  - web
  - react
featuredImage: radio.png
---

Sometimes you gotta do what you gotta do. For quite a while I've had this idea of making a radio player or an app which you could use to search up or browse different radio stations, but something else always came first. The holidays, job, working on other projects, but I finally got around to doing it. If you want to see how I did it keep on reading and if you prefer a video version you can watch me build a radio player app in React on Youtube:

<iframe width="560" height="315" src="https://www.youtube.com/embed/dNTpGEULK_I" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

I started a new React app by running the create-react-app command in my working folder.

```
create-react-app radio
```

I made a new component called Radio.js and imported it into App.js. I also added a couple of headings in there.

```jsx
// App.js

import "./App.scss"
import Radio from "./Radio"

function App() {
  return (
    <div className="App">
      <h1>Super-Duper Radio Player</h1>
      <h2>Pick a genre, choose a station, start listening</h2>
      <Radio />
    </div>
  )
}

export default App
```

I imagined this as a simple app which you could use to get a bunch of different radio stations and either search through them or filter them in some way, preferably through music genres or radio station types. After looking through several different radio APIs I decided on using an React existing module to get the stations as it turned out that I would otherwise need to set up a server to fetch them which would have been a bit of an overkill.

I installed radio-browser-api which has the music genre as one of the entry parameters for searching through the data, which was perfect for me. I also installed react-h5-audio-player which I will use later to play the radio streams and I proceeded with making a filter section.

```jsx
import React, { useEffect, useState } from "react"
import { RadioBrowserApi } from "radio-browser-api"
import AudioPlayer from "react-h5-audio-player"
import "react-h5-audio-player/lib/styles.css"

export default function Radio() {
  const [stations, setStations] = useState()
  const [stationFilter, setStationFilter] = useState("all")

  const filters = [
    "all",
    "classical",
    "country",
    "dance",
    "disco",
    "house",
    "jazz",
    "pop",
    "rap",
    "retro",
    "rock",
  ]

  return (
    <div className="radio">
      <div className="filters">
        {filters.map((filter, index) => (
          <span
            key={index}
            className={stationFilter === filter ? "selected" : ""}
            onClick={() => setStationFilter(filter)}
          >
            {filter}
          </span>
        ))}
      </div>
      <div className="stations"></div>
    </div>
  )
}
```

I made an array which contains a bunch of different genres which I found were working properly with the RadioBrowserApi component. Then I mapped them out into a container and made them clickable. After clicking on a station filter we set the active music type with useState and we also "mark" it with the "selected" CSS class, which we'll use later to distinguish the selected filter from the rest.

Now we need to get the radio stations data and we'll do that inside of a useEffect hook.

```jsx
useEffect(() => {
  setupApi(stationFilter).then(data => {
    setStations(data)
  })
}, [stationFilter])

const setupApi = async stationFilter => {
  const api = new RadioBrowserApi(fetch.bind(window), "My Radio App")

  const stations = await api
    .searchStations({
      language: "english",
      tag: stationFilter,
      limit: 30,
    })
    .then(data => {
      return data
    })

  return stations
}
```

Our useEffect will trigger every time our stationFilter changes and it will call the searchStations() function through the RadioBrowserApi. We can pass several different parameters into it, but I settled on setting the language to english, filtering the stations by the station filter that we previously set up and limiting the results to 30 stations. After we get the data we update our state with it and we will proceed with mapping it into the page, right below the filters.

```jsx
const setDefaultSrc = event => {
  event.target.src = defaultImage
}

return (
  <div className="radio">
    <div className="filters">
      {filters.map((filter, index) => (
        <span
          key={index}
          className={stationFilter === filter ? "selected" : ""}
          onClick={() => setStationFilter(filter)}
        >
          {filter}
        </span>
      ))}
    </div>
    <div className="stations">
      {stations &&
        stations.map((station, index) => {
          return (
            <div className="station" key={index}>
              <div className="stationName">
                <img
                  className="logo"
                  src={station.favicon}
                  alt="station logo"
                  onError={setDefaultSrc}
                />
                <div className="name">{station.name}</div>
              </div>
            </div>
          )
        })}
    </div>
  </div>
)
```

We get some interesting things from the API, such as the station name, logo and the resolved url of the audio stream. Sometimes the API won't return a proper image Url, or the image will for some reason be inaccessible. We resolve this issue by setting up the onError event on our img tag. If the image errors out we call out little setDefaultSrc function which switches the image source with a default image we provide it with. Don't forget to import your image into the component first.

The next thing we need to do is setting up the AudioPlayer component we installed previously.

```jsx
<AudioPlayer
  className="player"
  src={station.urlResolved}
  showJumpControls={false}
  layout="stacked"
  customProgressBarSection={[]}
  customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
  autoPlayAfterSrcChange={false}
/>
```

The AudioPlayer component accepts several different props. You can set up a className per usual, but the main thing is the src prop which we need to set with the urlResolved value we get from the API. The rest is just some visual settings which you can play around with, or check out their documentation for more options. You will probably want to set autoPlayAfterSrcChange to false as that will prevent all AudioPlayer instances from auto playing when you switch between your filters. All of the other settings I've used are just for hiding the controls I don't need.

Here is the final look of the Radio.js component:

```jsx
import React, { useEffect, useState } from "react"
import { RadioBrowserApi } from "radio-browser-api"
import AudioPlayer from "react-h5-audio-player"
import "react-h5-audio-player/lib/styles.css"
import defaultImage from "./radio.jpg"

export default function Radio() {
  const [stations, setStations] = useState()
  const [stationFilter, setStationFilter] = useState("all")

  useEffect(() => {
    setupApi(stationFilter).then(data => {
      console.log(data)
      setStations(data)
    })
  }, [stationFilter])

  const setupApi = async stationFilter => {
    const api = new RadioBrowserApi(fetch.bind(window), "My Radio App")

    const stations = await api
      .searchStations({
        language: "english",
        tag: stationFilter,
        limit: 30,
      })
      .then(data => {
        return data
      })

    return stations
  }

  const filters = [
    "all",
    "classical",
    "country",
    "dance",
    "disco",
    "house",
    "jazz",
    "pop",
    "rap",
    "retro",
    "rock",
  ]

  const setDefaultSrc = event => {
    event.target.src = defaultImage
  }

  return (
    <div className="radio">
      <div className="filters">
        {filters.map((filter, index) => (
          <span
            key={index}
            className={stationFilter === filter ? "selected" : ""}
            onClick={() => setStationFilter(filter)}
          >
            {filter}
          </span>
        ))}
      </div>
      <div className="stations">
        {stations &&
          stations.map((station, index) => {
            return (
              <div className="station" key={index}>
                <div className="stationName">
                  <img
                    className="logo"
                    src={station.favicon}
                    alt="station logo"
                    onError={setDefaultSrc}
                  />
                  <div className="name">{station.name}</div>
                </div>

                <AudioPlayer
                  className="player"
                  src={station.urlResolved}
                  showJumpControls={false}
                  layout="stacked"
                  customProgressBarSection={[]}
                  customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
                  autoPlayAfterSrcChange={false}
                />
              </div>
            )
          })}
      </div>
    </div>
  )
}
```

The only thing left to do is make all of this a bit more presentable by adding some (S)CSS to it. Here is what I've used:

```scss
@import url("https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap");

.App {
  display: flex;
  align-items: center;
  flex-direction: column;
}

body {
  background: rgb(40, 31, 53);
  background: linear-gradient(to right, rgb(40, 31, 53), rgb(61, 46, 83));
  color: rgb(235, 235, 235);
  font-family: "Architects Daughter", cursive;
}

h1 {
  margin: 1em 0 0 0;
  font-size: 3rem;
}

h2 {
  margin-bottom: 2em;
}

.radio {
  max-width: 60em;
  width: 100%;
}

.filters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2em;
  font-size: 1.2rem;
  width: 100%;

  span {
    margin: 0.25em;
    border: 1px solid #e36bae;
    border-radius: 10px;
    padding: 0.25em 0.75em;

    &:hover {
      cursor: pointer;
      background: linear-gradient(to bottom right, #e36bae, #fb743e);
    }
  }

  .selected {
    background: linear-gradient(to bottom right, #e36bae, #fb743e);
  }
}

.stations {
  display: grid;
  grid-template-columns: repeat(3, 33%);
  width: 100%;
}

.station {
  font-size: 1.2em;
  border: 1px solid rgb(76, 62, 95);
  margin: 0.25em;
  border-radius: 10px;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: #e36bae;
  }
}

.stationName {
  display: flex;
  flex-direction: row;
  margin-bottom: 1em;
  width: 100%;
  align-items: center;
  justify-content: start;
}

.name {
  width: 100%;
  text-align: center;
}

img {
  display: block;
  width: 2.5em;
  height: 2.5em;
  border-radius: 50%;
  border: 2px solid rgb(76, 62, 95);
  margin: 0 0.25em;
}

audio {
  width: 100%;
}

.rhap_container.player {
  background-color: rgb(76, 62, 95);
  display: flex;
  justify-items: center;
  padding: 0.25em 0.75em;
  border-radius: 10px;
}

.rhap_stacked .rhap_controls-section {
  margin-top: 0 !important;
}

.rhap_controls-section .rhap_volume-controls {
  justify-content: center;
}

.rhap_controls-section .rhap_main-controls button[aria-label="Play"] svg path {
  fill: rgb(235, 235, 235) !important;
}

.rhap_controls-section .rhap_main-controls button[aria-label="Pause"] svg path {
  fill: #e36bae !important;
}

@media only screen and (max-width: 600px) {
  .stations {
    grid-template-columns: repeat(2, 50%);
  }

  img {
    display: none;
  }
}
```

Nothing major to explain here. I've used the grid to set up the stations into a 3-column layout for desktop and a 2-column layout on mobile. I used flexbox to align and center everything else. The weird selectors in the end are for overriding the AudioPlayer'c CSS. There were some instructions on how to do it with setting up SCSS properties, but I couldn't make it work that way.

With that our radio app prototype is finished, or is it? There are all sorts of things you could add to this to make it both more functional and easier to use. A couple of things that spring to mind are making the stations searchable by name and adding an option to bookmark stations or mark them as favorite. If you do end up improving this app idea send me a message, I would love to see your creations!

<hr>
 
<div class="sectionHighlight">If you have any questions or comments you can reach out to me on <a href="https://twitter.com/alekswritescode" target="_blank" rel="noopener noreferrer">Twitter</a> and <a href="https://www.instagram.com/aleks.popovic/" target="_blank" rel="noopener noreferrer">Instagram</a>, where I also post interesting code tidbits and designs.
 
I also have a <a href="https://www.youtube.com/AleksPopovic" target="_blank" rel="noopener noreferrer">YouTube channel</a> where I regularly upload React and web dev tutorials, so if that's your cup of tea feel free to support me by subscribing.</div>

If you want to see the live app in action check out this CodeSandbox:

<iframe src="https://codesandbox.io/embed/romantic-butterfly-khodz?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Radio in React"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
