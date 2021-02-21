---
title: "Infinite Pomodoro App in React"
date: "2021-02-21"
description: "Pomodoro is a time management technique in which you work for a set amount of time (e.g. 25 minutes), then you take a small break (e.g. 5 minutes) and then you repeat this cycle. In classic Pomodoro you would work for 4 cycles total and then take a longer break, but in this simplified version we are going to build a time tracker that repeats infinitely. Or, until you decide to stop working and close the browser for the day."
tags:
  - web
  - react
featuredImage: pomodoro.png
---

Pomodoro is a time management technique in which you work for a set amount of time (e.g. 25 minutes), then you take a small break (e.g. 5 minutes) and then you repeat this cycle. In classic Pomodoro you would work for 4 cycles total and then take a longer break, but in this simplified version we are going to build a time tracker that repeats infinitely. Or, until you decide to stop working and close the browser for the day.

If you prefer a video version you can watch me build this on Youtube:

<iframe width="560" height="315" src="https://www.youtube.com/embed/9z1qBcFwdXg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

I started a new React app by running the create-react-app command in my working folder.

```
create-react-app pomodoro
```

We proceed by making a new component called Pomodoro.js and importing it into our App.js.

```jsx
// App.js

import "./App.css"
import Pomodoro from "./Pomodoro"

function App() {
  return (
    <div className="App">
      <Pomodoro />
    </div>
  )
}

export default App
```

Inside of our Pomodoro component we are going to add a bit of JSX for our timer and a simple message.

```jsx
import React, { useState, useEffect } from "react"

export default function Pomodoro() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [displayMessage, setDisplayMessage] = useState(false)

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds

  return (
    <div className="pomodoro">
      <div className="message">
        {displayMessage && <div>Break time! New session starts in:</div>}
      </div>
      <div className="timer">
        {timerMinutes}:{timerSeconds}
      </div>
    </div>
  )
}
```

There's a lot of things happening in there, so let's break it down a little bit. First, we import useState and useEffect hooks and we implement a couple of properties that utilize useState. These will be our minutes and seconds "trackers" and a boolean telling us if we should display the message during the break.

We are setting starting minutes to 25 since classic pomodoro is done this way, but feel free to set a different value, or even implement some input fields for choosing the starting time.

Digital clocks and timers usually show single digit numbers with a zero in front, so we are going to do that as well. Before displaying minutes and seconds we do a simple check to determine if we need to add a zero before a number.

Now is a good time to set up our CSS. I chucked it all into App.css, but feel free to make a separate file and import it into our component.

```css
body {
  background-color: #1e212d;
  color: #eabf9f;
  height: 100vh;
  font-family: "Roboto Mono", monospace;
}

#root {
  height: 100%;
}

.App {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.pomodoro {
  font-size: 6em;
}

.message {
  font-size: 0.5em;
  min-height: 1.3em;
  margin-bottom: 0.5em;
}
```

Most of the CSS is used just for centering and adding some nice colors and a font. We are also changing the font size for both the timer and the message so they cover a good part of the screen.

Let's get back to the Pomodoro component and finish implementing our timer. We have a couple of use-cases that we need to cover in our useEffect hook, so let's outline them first.

```jsx
useEffect(() => {
  let interval = setInterval(() => {
    clearInterval(interval)

    if (seconds === 0) {
      if (minutes !== 0) {
        // seconds are 0 but minutes are not 0
        // -> decrease minutes by 1 and reset seconds from 0 to 59
      } else {
        // both minutes and seconds are 0
        // -> we start a new break timer, or reset the timer if the break finished
      }
    } else {
      // seconds are not 0
      // -> just decrease seconds by 1
    }
  }, 1000)
}, [seconds])
```

We've set up a useEffect hook which is tracking our seconds in the callback. When we update our seconds property, useEffect gets triggered and we immediately set a one second interval which checks what we need to do. We also need to clear the interval or we will get some nasty side-effects. React hooks are asynchronous, so our changes won't happen exactly at the 1000th millisecond, but it's close enough that we don't mind.

As for our use-cases, we have the simplest one where there are still seconds left on the clock in which case we just decrease seconds count by 1. If seconds are down to zero then two things can happen. We reached the end of our timer (minutes are 0) or there are still some minutes left.

Here is what our implemented use-cases look like:

```jsx
useEffect(() => {
  let interval = setInterval(() => {
    clearInterval(interval)

    if (seconds === 0) {
      if (minutes !== 0) {
        setSeconds(59)
        setMinutes(minutes - 1)
      } else {
        let minutes = displayMessage ? 24 : 4
        let seconds = 59

        setSeconds(seconds)
        setMinutes(minutes)
        setDisplayMessage(!displayMessage)
      }
    } else {
      setSeconds(seconds - 1)
    }
  }, 1000)
}, [seconds])
```

Both cases where there is still some time left are pretty self-explanatory - we either decrease the seconds, or we decrease the minutes and reset seconds to 59. For the "timer has run out" use-case we need to check if we are resetting the original timer, or are we starting a shorter break timer. We do this with our displayMessage property, because the message is only being displayed during a break.

We are always setting our seconds to 59 because we don't want to have an additional second delay between the timers, but the minutes are more interesting. If the message is currently being shown that means we were taking a break and we should reset minutes to 24. If the message is not being shown that means the original counter has ended and we need to take a break, which means starting a timer with 4 minutes.

We set our minutes and seconds and switch the displayMessage boolean to its opposite value, and we are done!

Here is the final Pomodoro component's look:

```jsx
import React, { useState, useEffect } from "react"

export default function Pomodoro() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [displayMessage, setDisplayMessage] = useState(false)

  useEffect(() => {
    let interval = setInterval(() => {
      clearInterval(interval)

      if (seconds === 0) {
        if (minutes !== 0) {
          setSeconds(59)
          setMinutes(minutes - 1)
        } else {
          let minutes = displayMessage ? 24 : 4
          let seconds = 59

          setSeconds(seconds)
          setMinutes(minutes)
          setDisplayMessage(!displayMessage)
        }
      } else {
        setSeconds(seconds - 1)
      }
    }, 1000)
  }, [seconds])

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds

  return (
    <div className="pomodoro">
      <div className="message">
        {displayMessage && <div>Break time! New session starts in:</div>}
      </div>
      <div className="timer">
        {timerMinutes}:{timerSeconds}
      </div>
    </div>
  )
}
```

<hr>
 
<div class="sectionHighlight">If you have any questions or comments you can reach out to me on <a href="https://twitter.com/alekswritescode" target="_blank" rel="noopener noreferrer">Twitter</a> and <a href="https://www.instagram.com/aleks.popovic/" target="_blank" rel="noopener noreferrer">Instagram</a>, where I also post interesting code tidbits and designs.
 
I also have a <a href="https://www.youtube.com/AleksPopovic" target="_blank" rel="noopener noreferrer">YouTube channel</a> where I regularly upload React and web dev tutorials, so if that's your cup of tea feel free to support me by subscribing.</div>
