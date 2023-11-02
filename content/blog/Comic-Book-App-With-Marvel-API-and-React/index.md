---
title: "Comic Book App With Marvel API and React"
date: "2023-11-02"
description: "I grew up on both DC and Marvel comic books, cartoons and TV shows. From the 1966 Batman series, to 1967 Spider man cartoons, and 1940s Superman cartoons. Which is sort of ridiculous since I grew up in the 90s, but I guess that's what our TV companies could afford at the time."
tags:
  - web
  - react
  - API
featuredImage: marvel.png
---

I grew up on both DC and Marvel comic books, cartoons and TV shows. From the 1966 Batman series, to 1967 Spider man cartoons, and 1940s Superman cartoons, which were super old even in the 90s, but I guess that's what our TV companies could afford at the time.

Nowadays if I want to read a comic book I have no idea where to even begin. There are so many different characters, storylines and multiverses which may or may not be connected. Which got me thinking - what if I had a searchable comic book library where I could enter a character’s name and I would get all of their comic books from which I can pick and choose what to read?

The original idea was to make it searchable by both Marvel and DC characters but DC doesn't seem to have an official public API while Marvel does, so that will have to do for this project. For more general superhero information you can also use superheroAPI, but to get the comic book data we will use <a href="https://developer.marvel.com/" target="_blank" rel="noreferrer">Marvel's official API</a>. Before starting you should make sure you have set up your Marvel developer account and you have access to your private and public API keys, as we will need those later.

If you prefer a video version of this tutorial you can watch me build the comic book library app in React on Youtube:

<iframe width="560" height="315" src="https://www.youtube.com/embed/l6-et1iNWMk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

I started a new React app through <a href="https://vitejs.dev/" target="_blank" rel="noreferrer">Vite</a> by running:

```
yarn create vite
```

If you don't use yarn you can find detailed scaffolding instructions on <a href="https://vitejs.dev/guide/#scaffolding-your-first-vite-project" target="_blank" rel="noreferrer">Vite's Getting Started page</a>.

For this project we are going to use two additional packages - sass for writing Sass, and md5 for hashing one of the parameters for our API request. To install them run:

```
yarn add sass md5
```

We are also going to use a couple of images in our styling which you can grab <a href="https://github.com/alekspopovic/marvel/tree/main/comic-library/src/images" target="_blank" rel="noreferrer">from my GitHub repo</a>. Make sure to put them in your `/src/images` folder.

Final peace of setup that you need to do before continuing is configuring your environment variables. If you are working with Vite like me you need to create a new file called `.env.local` in your project's root and add these two properties to it.

```jsx
VITE_PUBLIC_KEY = "YOUR_PUBLIC_KEY"
VITE_PRIVATE_KEY = "YOUR_PRIVATE_KEY"
```

Make sure to replace the strings with your actual public and private keys from the Marvel's developer portal. Your variables need to be prefixed with `VITE_`, so make sure to not remove that part. After that you can proceed with creating components.

To start off I made a new folder called `components` and in there I added a new component called `Search.jsx` and imported it into `App.jsx`. Here is what the `App.jsx` looks like.

```jsx
// App.js

import "./App.css"
import Search from "./components/Search"

function App() {
  return (
    <div className="App">
      <Search />
    </div>
  )
}

export default App
```

The main purpose of the app is to be able to search comic book characters by their name. Once we select a character we should get a list of their comic books and clicking on a comic book should show us more details about that specific comic book.

Most of our app's logic is going to happen in the Search component, so here is what it should look like.

```jsx
// Search.jsx

import "../styles/Search.scss"
import { useState } from "react"
import md5 from "md5"
import Characters from "./Characters"
import Comics from "./Comics"

export default function Search() {
  const [characterName, setCharacterName] = useState("")
  const [characterData, setCharacterData] = useState(null)
  const [comicData, setComicData] = useState(null)

  const publicKey = import.meta.env.VITE_PUBLIC_KEY
  const privateKey = import.meta.env.VITE_PRIVATE_KEY

  const handleSubmit = (event) => {
    event.preventDefault()
    getCharacterData()
  }

  const getCharacterData = () => {
    setCharacterData(null)
    setComicData(null)

    const timeStamp = new Date().getTime()
    const hash = generateHash(timeStamp)

    const url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}&nameStartsWith=${characterName}&limit=100`

    fetch(url)
      .then(response => response.json())
      .then(result => {
        setCharacterData(result.data)
        console.log(result.data)
      })
      .catch(error => {
        console.log("There was an error:", error)
      })
  }

  const getComicData = (characterId) => {
    window.scrollTo({ top: 0, left: 0 })

    const timeStamp = new Date().getTime()
    const hash = generateHash(timeStamp)

    const url = `https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}`

    fetch(url)
      .then(response => response.json())
      .then(results => {
        setComicData(results.data)
        console.log(results)
      })
      .catch(error => {
        console.log("Error while fetching comic data", error)
      })
  }

  const generateHash = (timeStamp) => {
    return md5(timeStamp + privateKey + publicKey)
  }

  const handleChange = (event) => {
    setCharacterName(event.target.value)
  }

  const handleReset = () => {
    setCharacterData(null)
    setComicData(null)
    setCharacterName("")
  }

  return (
    <>
      <form className="search" onSubmit={handleSubmit}>
        <input
          placeholder="ENTER CHARACTER NAME"
          type="text"
          onChange={handleChange}
        />
        <div className="buttons">
          <button type="submit">Get character data</button>
          <button type="reset" className="reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>

      {!comicData && characterData && characterData.results[0] && (
        <Characters data={characterData.results} onClick={getComicData} />
      )}

      {comicData && comicData.results[0] && <Comics data={comicData.results} />}
    </>
  )
}
```

The Search component might look a bit daunting but in essence it's not too complicated. We have a submittable form with an input text field and a few buttons. The input has an `onChange` event that is calling the `handleChange` function which is a very simple function in which we set the character's name through `useState`.

Submitting the form or clicking the submit button will call the `handleSubmit` function which calls the `getCharacterData` function. In `getCharacterData` we do several things. We reset our state and make a hashed timestamp which we need as one of the API parameters. We are doing this by combining the timestamp with our private and public API keys that we got from the Marvel's developer portal and passing them into `md5` function which we are importing from the `md5` package.

If you followed my .env file setup from the beginning you can use your environment variables with `import.meta.env.VITE_PUBLIC_KEY` and `import.meta.env.VITE_PRIVATE_KEY`.

We are conditionally showing `Characters` and `Comics` component at the bottom. The idea here is that we want to show `Characters` if we have character data. If we have the comic book data then we want to hide `Characters` and show only `Comics`.

We are passing in `getComicData` function into `Characters` component which is going to be used as an `onClick` event in there. The function is very similar to `getCharacterData`, but we are calling a different endpoint and this time we need the `characterId` as an additional parameter, because we are fetching only that character's comic books.

Finally, `handleReset` is used to reset all component state, as its name implies.

Here is what the `Characters` component looks like.

```jsx
// Characters.jsx

import "../styles/Characters.scss"

export default function Characters({ data, onClick }) {
  return (
    <div className="characters">
      {data.map(character => {
        return (
          <div
            key={character.id}
            className="characterCard"
            style={{
              background: `url(${character.thumbnail.path}.${character.thumbnail.extension}) no-repeat center`,
              backgroundSize: "cover",
            }}
            onClick={() => onClick(character.id)}
          >
            <div className="caption">{character.name}</div>
            <div className="caption bottom">View Comics</div>
          </div>
        )
      })}
    </div>
  )
}
```

We are passing our character data and our `onClick` event in there and we are simply mapping everything into character card elements. We are dynamically setting the card background by using an image URL we get from character data.

We are using two different captions at the bottom. The first one will be visible by default and it displays the character's name. The second one will be hidden and on mouse hover the character's name will dissapear and the `View Comics` caption will pop out. We are using this as a way to indicate the cards are clickable. So far both captions are being shown, but we will fix this later in CSS.

Here is what the `Comics` component looks like.

```jsx
// Comics.jsx

import "../styles/Comics.scss"

export default function Comics({ data }) {
  return (
    <div className="comics">
      {data.map(comic => {
        const detailsUrl = comic.urls.find(
          element => element["type"] === "detail"
        ).url

        return (
          <a
            key={comic.id}
            className="comicCard"
            style={{
              background: `url(${comic.thumbnail.path}.${comic.thumbnail.extension}) no-repeat center`,
              backgroundSize: "cover",
            }}
            href={detailsUrl}
            target="_blank"
            rel="noreferrer"
          >
            <div className="caption">{comic.title}</div>
            <div className="caption bottom">View Comic Details</div>
          </a>
        )
      })}
    </div>
  )
}
```

This one is similar to `Characters` component with a few key differences. Before mapping out the comic book cards we need to find the URL for each comic on Marvel's official website. Each comic has a property called `urls` which contains different objects which have two properties - `type` and `url`. The object which has its `type` equal to `detail` contains our URL in its `url` property, so we need to find it and extract it.

We are then free to map out all comic book elements into comic card links. We are setting their background the same way we did for the `Comics` component and we are also adding two captions, but this time the default one shows the comic book title.

That is everything as far as our functionalities go. If you want to set up your CSS the same way as I did you can use the following code. Also, make sure to put your `.scss` files into a separate `styles` folder.

```scss
// Search.scss

.search {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  margin: 1em auto;
}

input {
  width: 300px;
  font-size: 1.4em;
  text-align: center;
  margin: 1em 0;
  font-family: "Bangers", cursive;
  padding: 0.5em 0;
}

button {
  font-size: 1.2em;
  padding: 0.5em 1em;
  margin-bottom: 1em;
  cursor: pointer;
  font-family: "Bangers", cursive;
  background: rgb(255, 240, 33);
  transition: linear 0.2s;
  border: 1px solid black;
  box-shadow: 2px 2px black;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 4px 4px black;
  }

  &.reset {
    margin-left: 0.25em;
    background-color: white;
  }
}
```

```scss
// Characters.scss

.characters {
  max-width: 80vw;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  padding: 1em;
  background-color: white;
  background-image: url(../images/paper.jpg);
}

.characterCard {
  padding: 1em;
  display: flex;
  flex-direction: column;
  height: 300px;
  border: 2px solid black;
  box-shadow: 4px 4px black;
  filter: grayscale(100);

  transition: 0.2s linear;

  .caption {
    font-family: "Bangers", cursive;
    font-size: 1.6em;
    text-align: center;
    margin: auto auto 0 auto;
    padding: 0.5em 1em;

    background-color: white;
    background-image: url(../images/paper.jpg);

    border: 1px solid black;
    box-shadow: 2px 2px black;

    &.bottom {
      position: absolute;
      bottom: 1rem;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
    }
  }

  &:hover {
    cursor: pointer;
    filter: grayscale(0);
    box-shadow: 6px 6px black;
    transform: translate(-2px, -2px);

    .caption {
      opacity: 0;
    }

    .bottom {
      opacity: 1;
    }
  }
}

@media only screen and (max-width: 800px) {
  .characters {
    grid-template-columns: repeat(1, 1fr);
  }
}
```

```scss
// Comics.scss

.comics {
  max-width: 80vw;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
  padding: 1em;
  background-color: white;
  background-image: url(../images/paper.jpg);
}

.comicCard {
  padding: 1em;
  display: flex;
  flex-direction: column;
  height: 400px;
  border: 2px solid black;
  box-shadow: 4px 4px black;
  filter: grayscale(100);

  transition: 0.2s linear;
  text-decoration-color: black;

  .caption {
    font-family: "Bangers", cursive;
    font-size: 1.6em;
    text-align: center;
    margin: auto auto 0 auto;
    padding: 0.5em 1em;

    background-color: white;
    background-image: url(../images/paper.jpg);

    color: black;
    border: 1px solid black;
    box-shadow: 2px 2px black;

    &.bottom {
      position: absolute;
      bottom: 1rem;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
      color: black;
      text-decoration: underline;
      width: 60%;
    }
  }

  &:hover {
    cursor: pointer;
    filter: grayscale(0);
    box-shadow: 6px 6px black;
    transform: translate(-2px, -2px);

    .caption {
      opacity: 0;
    }

    .bottom {
      opacity: 1;
    }
  }
}

@media only screen and (max-width: 1200px) {
  .comics {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media only screen and (max-width: 800px) {
  .comics {
    grid-template-columns: repeat(1, 1fr);
  }
}
```

You will also need to add a small chunk of CSS in your `index.css` file at the root of your project, to make sure your background and fonts are being properly displayed. Here is what my `index.css` looks like.

```scss
@import url("https://fonts.googleapis.com/css2?family=Bangers&display=swap");
body {
  margin: 0;
  background: linear-gradient(
        45deg,
        rgba(0, 110, 193, 0.3),
        rgba(0, 115, 138, 0.1)
      ) no-repeat fixed center, url("./images/spiderman.jpg") no-repeat fixed
      center;
  background-size: cover;
}
```

And with that our Marvel Comic Book app is finished. You can of course expand it with other interesting functionalities, such as bookmarking your favorite characters and comics that you want to read, or making a database of comics you already finished reading. You can also expand the search functionality to also include and directly search comic book names, or events that are connected to the Marvel universe (you can find these properties and endpoints in the API documentation). If you do end up improving this app send me a message. I would love to see your creations!

<hr>
 
<div class="sectionHighlight">If you have any questions or comments you can reach out to me on <a href="https://twitter.com/alekswritescode" target="_blank" rel="noopener noreferrer">Twitter</a> and <a href="https://www.instagram.com/aleks.popovic/" target="_blank" rel="noopener noreferrer">Instagram</a>, where I also post interesting code tidbits and designs.
 
I also have a <a href="https://www.youtube.com/AleksPopovic" target="_blank" rel="noopener noreferrer">YouTube channel</a> where I regularly upload React and web dev tutorials, so if that's your cup of tea feel free to support me by subscribing.</div>
