---
title: "How to build a Pixel Art Drawing App in React"
date: "2020-12-05"
description: "Pixel art games have been making a huge comeback in recent years, but this time not because we are limited by technology, but because pixel art is really great. Some game developers are adjusting their workflows to transform their end product into a pixel art game even though they might start with 3d modeling at first. Others go the usual way of drawing sprites in a Pixel Art Editor and that is exactly what we are going to build today. We will go over how to generate a dynamic pixel grid, how to set up a color picker, how to actually draw pixels and in the end how to export your finished pixel art into a png image."
tags:
  - web
  - react
featuredImage: pixels.png
---

Pixel art games have been making a huge comeback in recent years, but this time not because we are limited by technology, but because pixel art is really great. Some game developers are adjusting their workflows to transform their end product into a pixel art game even though they might start with 3d modeling at first. Others go the usual way of drawing sprites in a Pixel Art Editor and that is exactly what we are going to build today. We will go over how to generate a dynamic pixel grid, how to set up a color picker, how to actually draw pixels and in the end how to export your finished pixel art into a png image.

If you prefer a video version you can watch me build this on Youtube:

<iframe width="560" height="315" src="https://www.youtube.com/embed/IAD68la3An8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

I started a new React app by running create-react-app command in my working folder.

```
create-react-app pixels
```

For this project I will focuse more on the React part of the code, but there will be a SandBox link to a full code example that includes the CSS files as well. I mainly used flexbox to center elements, and that's pretty much 80% of the CSS used. The rest is adding custom colors and margins for separation between elements.

To start off - I removed all unnecessary code from App.js and I imported the Editor component, which is going to be the heart of this app.

```jsx
import "../styles/App.scss"
import Editor from "./Editor"

function App() {
  return (
    <div className="App">
      <Editor />
    </div>
  )
}

export default App
```

Next we need to set up the Editor.

```jsx
import React, { useState } from "react"
import "../styles/editor.scss"

export default function Editor() {
  return (
    <div id="editor">
      <h1>Pixel Editor</h1>
      <h2>Enter Panel Dimensions</h2>

      <div id="options">
        <div className="option">
          <input type="number" className="panelInput" />
          <span>Width</span>
        </div>
        <div className="option">
          <input type="number" className="panelInput" />
          <span>Height</span>
        </div>
      </div>

      <button className="button">Start Drawing</button>
    </div>
  )
}
```

We have a coupled of heading elements and some input fields which we will use to dynamically set the drawing panel's width and height. There is also a button which we will use to hide the options and initialize the drawing panel, but also to reset the pixel grid if the user wants to start over. To do that we need to set up some useState hooks.

```jsx
import React, { useState } from "react"
import "../styles/editor.scss"

export default function Editor() {
  //highlight-start
  const [panelWidth, setPanelWidth] = useState(16)
  const [panelHeight, setPanelHeight] = useState(16)
  const [hideOptions, setHideOptions] = useState(false)
  const [hideDrawingPanel, setHideDrawingPanel] = useState(true)
  const [buttonText, setButtonText] = useState("start drawing")
  const [selectedColor, setColor] = useState("#f44336")
  //highlight-end

  //highlight-start
  function initializeDrawingPanel() {
    setHideOptions(!hideOptions)
    setHideDrawingPanel(!hideDrawingPanel)

    buttonText === "start drawing"
      ? setButtonText("reset")
      : setButtonText("start drawing")
  }
  //highlight-end

  return (
    <div id="editor">
      <h1>Pixel Editor</h1>
      //highlight-start
      {hideDrawingPanel && <h2>Enter Panel Dimensions</h2>}
      {hideDrawingPanel && (
        //highlight-end
        <div id="options">
          <div className="option">
            <input
              type="number"
              className="panelInput"
              //highlight-start
              defaultValue={panelWidth}
              onChange={e => {
                setPanelWidth(e.target.value)
              }}
              //highlight-end
            />
            <span>Width</span>
          </div>
          <div className="option">
            <input
              type="number"
              className="panelInput"
              //highlight-start
              defaultValue={panelHeight}
              onChange={e => {
                setPanelHeight(e.target.value)
              }}
              //highlight-end
            />
            <span>Height</span>
          </div>
        </div>
        //highlight-start
      )}
      <button onClick={initializeDrawingPanel} className="button">
        {buttonText}
      </button>
      //highlight-end
    </div>
  )
}
```

With useState we are controlling the width and height of the drawing panel. I've also added some properties to control the element visibility. After you set up the dimensions and click the button to start drawing - all of the options will be hidden until we click our repurposed Reset button.

A drawing app wouldn't be very useful without any colorin options. For this project I decided to use a plugin react-color which has a lot of different color picker options. I've chosen their CirclePicker component, but you can find the full list of possibilities on <a href="https://casesandberg.github.io/react-color/" target="_blank" rel="noopener noreferrer">their website</a>, and they all work in a similar way.

You can install it by running

```
npm install react-color

```

Now we need to set it up.

```jsx
import React, { useState } from "react"
import "../styles/editor.scss"
//highlight-next-line
import { CirclePicker } from "react-color"

export default function Editor() {
  const [panelWidth, setPanelWidth] = useState(16)
  const [panelHeight, setPanelHeight] = useState(16)
  const [hideOptions, setHideOptions] = useState(false)
  const [hideDrawingPanel, setHideDrawingPanel] = useState(true)
  const [buttonText, setButtonText] = useState("start drawing")
  const [selectedColor, setColor] = useState("#f44336")

  function initializeDrawingPanel() {
    setHideOptions(!hideOptions)
    setHideDrawingPanel(!hideDrawingPanel)

    buttonText === "start drawing"
      ? setButtonText("reset")
      : setButtonText("start drawing")
  }

  //highlight-start
  function changeColor(color) {
    setColor(color.hex)
  }
  //highlight-end

  return (
    <div id="editor">
      <h1>Pixel Editor</h1>
      {hideDrawingPanel && <h2>Enter Panel Dimensions</h2>}
      {hideDrawingPanel && (
        <div id="options">
          <div className="option">
            <input
              type="number"
              className="panelInput"
              defaultValue={panelWidth}
              onChange={e => {
                setPanelWidth(e.target.value)
              }}
            />
            <span>Width</span>
          </div>
          <div className="option">
            <input
              type="number"
              className="panelInput"
              defaultValue={panelHeight}
              onChange={e => {
                setPanelHeight(e.target.value)
              }}
            />
            <span>Height</span>
          </div>
        </div>
      )}
      <button onClick={initializeDrawingPanel} className="button">
        {buttonText}
      </button>
      //highlight-start
      {hideOptions && (
        <CirclePicker color={selectedColor} onChangeComplete={changeColor} />
      )}
      //highlight-end
    </div>
  )
}
```

The color propc in the CirclePicker is used to mark which color is currently selected, useChangeComplete is the component's event which you can use to trigger an action. In our case, after selecting a different color from the picker we want to switch our selected color state.

The only thing left to do in the Editor is to add the DrawingPanel component which we yet need need to build out.

We import the component the usual way:

```jsx
import DrawingPanel from "./DrawingPanel"
```

We can add it into our code right below the button:

```jsx
{
  hideOptions && (
    <DrawingPanel
      width={panelWidth}
      height={panelHeight}
      selectedColor={selectedColor}
    />
  )
}
```

Here is what the DrawingPanel component looks like:

```jsx
import React, { useRef } from "react"
import "../styles/drawingPanel.scss"
import Row from "./Row"

export default function DrawingPanel(props) {
  const { width, height, selectedColor } = props

  let rows = []

  for (let i = 0; i < height; i++) {
    rows.push(<Row key={i} width={width} selectedColor={selectedColor} />)
  }

  return (
    <div id="drawingPanel">
      <div id="pixels">{rows}</div>
    </div>
  )
}
```

Based on the entered height we generate the same number of rows and we push them to a div container, but we also need to pass in our width to each Row component so we know how many "pixels" per row we need to generate. Next we need to set up the Row component, but we will come back to the DrawingPanel to set up our exporting to PNG.

```jsx
import React from "react"
import "../styles/row.scss"
import Pixel from "./Pixel"

export default function Row(props) {
  const { width, selectedColor } = props

  let pixels = []

  for (let i = 0; i < width; i++) {
    pixels.push(<Pixel key={i} selectedColor={selectedColor} />)
  }

  return <div className="row">{pixels}</div>
}
```

As you can see - we are generating pixels per row in the same way we are setting up rows in the drawing panel. Now we need to set up the Pixel component and we are almost done!

```jsx
import React, { useState } from "react"
import "../styles/pixel.scss"

export default function Pixel(props) {
  const { selectedColor } = props

  const [pixelColor, setPixelColor] = useState("#fff")
  const [oldColor, setOldColor] = useState(pixelColor)
  const [canChangeColor, setCanChangeColor] = useState(true)

  function applyColor() {
    setPixelColor(selectedColor)
    setCanChangeColor(false)
  }

  function changeColorOnHover() {
    setOldColor(pixelColor)
    setPixelColor(selectedColor)
  }

  function resetColor() {
    if (canChangeColor) {
      setPixelColor(oldColor)
    }

    setCanChangeColor(true)
  }

  return (
    <div
      className="pixel"
      onClick={applyColor}
      onMouseEnter={changeColorOnHover}
      onMouseLeave={resetColor}
      style={{ backgroundColor: pixelColor }}
    ></div>
  )
}
```

I wanted to have a visual indicator for being able to draw instead of just having a cursor change to pointer through CSS. So, I've set up some more useState hooks to help with that. The idea here is that we want to temporarily change the pixel's color when we hover it. If we hover out, we want to return it to its old color, which we store as a separate state. However, if we click on it before hovering out, we want to permanently set that color, and for that reason we have a helper state property canChangeColor to prevent onMouseLeave messing up our color change.

We are done with setting up the drawing functions, which means the only thing left is to set up our exporting. Back to the DrawingPanel component!

First we need to install the exporting plugin:

```
npm install react-component-export-image
```

After that we need to set it up with a useRef hook. The plugin needs a reference to a component or element that is being exported to an image.

```jsx
//highlight-next-line
import React, { useRef } from "react"
import "../styles/drawingPanel.scss"
import Row from "./Row"

//highlight-next-line
import { exportComponentAsPNG } from "react-component-export-image"

export default function DrawingPanel(props) {
  const { width, height, selectedColor } = props

  //highlight-next-line
  const panelRef = useRef()

  let rows = []

  for (let i = 0; i < height; i++) {
    rows.push(<Row key={i} width={width} selectedColor={selectedColor} />)
  }

  return (
    <div id="drawingPanel">
      //highlight-next-line
      <div id="pixels" ref={panelRef}>
        {rows}
      </div>
      //highlight-start
      <button onClick={() => exportComponentAsPNG(panelRef)} className="button">
        Export as PNG
      </button>
      //highlight-end
    </div>
  )
}
```

Now if you draw something in the panel and click our new export button you should get a new PNG image with your exported component. You can also use this plugin to export components to JPEG and PDF formats.

And that is all of the code I've used for this project, except for the CSS. If you are interested into seeing the full working version you can check out <a href="https://codesandbox.io/s/pixel-art-drawing-editor-fb51o" target="_blank" rel="noopener noreferrer">the project on CodeSandbox</a>.

If you have any questions or comments you can reach out to me on <a href="https://twitter.com/alekswritescode" target="_blank" rel="noopener noreferrer">Twitter</a> and <a href="https://www.instagram.com/aleks.popovic/" target="_blank" rel="noopener noreferrer">Instagram</a>, where I also post interesting code tidbits and designs.

I also regularly upload React and web dev tutorials to Youtube, so if that's your cup of tea feel free to support me by subscribing to <a href="https://www.youtube.com/channel/UCu3RVedqyL5o776xyQlbyAw" target="_blank" rel="noopener noreferrer">my channel</a>.
