---
title: "Building Meal Planning App with React and Spoonacular API"
date: "2021-01-17"
description: I've been playing around with a few different free APIs and I decided to make a simple meal planning app with Spoonacular API. It's very easy to set up and you can add a lot of things to it if you want to make a full blown food/recipe app.
tags:
  - react
  - web
  - tutorial
featuredImage: index.png
---

I've been playing around with a few different free APIs and I decided to make a simple meal planning app with <a href="https://spoonacular.com/" target="_blank" rel="noopener noreferrer">Spoonacular API</a>. It's very easy to set up and you can add a lot of things to it if you want to make a full blown food/recipe app.

If you prefer a video version of this tutorial you can watch it here:

<iframe width="560" height="315" src="https://www.youtube.com/embed/N5or5jBstg8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

# Project setup

We are going to start off by making a new React app.

```
create-react-app meal-planner
```

Our App component is going to be very simple, so I'm going to show you what it looks like straight away and explain how everything works.

```jsx
//App.js
import React, { useState } from "react"
import MealList from "./MealList"

function App() {
  const [mealData, setMealData] = useState(null)
  const [calories, setCalories] = useState(2000)

  function getMealData() {
    fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=cb1c464d94f142c08b156c5beddade8b&timeFrame=day&targetCalories=${calories}`
    )
      .then(response => response.json())
      .then(data => {
        setMealData(data)
      })
      .catch(() => {
        console.log("error")
      })
  }

  function handleChange(e) {
    setCalories(e.target.value)
  }

  return (
    <div className="App">
      <section className="controls">
        <input
          type="number"
          placeholder="Calories (e.g. 2000)"
          onChange={handleChange}
        />
        <button onClick={getMealData}>Get Daily Meal Plan</button>
      </section>
      {mealData && <MealList mealData={mealData} />}
    </div>
  )
}

export default App
```

We are using useState to handle our meal data that we will get from the API and to keep track of the calorie count which we need for our API call.

Our jsx is really simple. We have an input for our calorie count and a button which will trigger the API call on click, through the getMealData() function.

After we click the button we will try to fetch our meal plan data from Spoonacular. They have extensive documentation and I highly recommend checking it out. There are many different things you can do to play around with their API. In our case we will use the mealplanner/generate API call for which you need to pass in your API key, time frame and target calories.

You can get your own API key simply by registering on their website and you will also get a nice dashboard which you can use to check out your daily API usage. Their free plan is not overly restrictive, but you should still use your own key for this project.

Timeframe accepts two values - 'day' and 'week', for daily and weekly meal plan, respectively. For this app we are going to make a daily one, but keep in mind that weekly's API response has a different object structure if you go for making that one as well.

Calories are an integer and the API is going to try to fit in 3 meals in that number.

After we get a response, we turn it into a json object and we update our mealData state object with it. We also pass it as a prop into our MealList component which we will use to display daily macro data and also our separate meal data.

# Meal list component

```jsx
// MealList.js
import React from "react"
import Meal from "./Meal"

export default function MealList({ mealData }) {
  const nutrients = mealData.nutrients

  return (
    <main>
      <section className="nutrients">
        <h1>Macros</h1>
        <ul>
          <li>Calories: {nutrients.calories.toFixed(0)}</li>
          <li>Carbohydrates: {nutrients.carbohydrates.toFixed(0)}</li>
          <li>Fat: {nutrients.fat.toFixed(0)}</li>
          <li>Protein: {nutrients.protein.toFixed(0)}</li>
        </ul>
      </section>

      <section className="meals">
        {mealData.meals.map(meal => {
          return <Meal key={meal.id} meal={meal} />
        })}
      </section>
    </main>
  )
}
```

From our mealData object (which we just got from the API response) we can extract two important things which we can use.

First is the general nutrient data in terms of total calories, carbohydrates, fat and protein. We can just access them one by one and display them inside of an unordered list. To get nice rounded numbers we can use toFixed() function.

Next important thing are the meals themselves. We will put them into a separate section and map them to our Meal component.

# Meal component

```jsx
// Meal.js
import React, { useState, useEffect } from "react"

export default function Meal({ meal }) {
  const [imageUrl, setImageUrl] = useState("")

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=cb1c464d94f142c08b156c5beddade8b&includeNutrition=false`
    )
      .then(response => response.json())
      .then(data => {
        setImageUrl(data.image)
      })
      .catch(() => {
        console.log("error")
      })
  }, [meal.id])

  return (
    <article>
      <h1>{meal.title}</h1>
      <img src={imageUrl} alt="recipe" />
      <ul className="instructions">
        <li>Preparation time: {meal.readyInMinutes} minutes</li>
        <li>Number of servings: {meal.servings}</li>
      </ul>

      <a href={meal.sourceUrl}>Go to Recipe</a>
    </article>
  )
}
```

Our first API call doesn't return an image and what is a food item card going to look like without a nice image which shows our meal? It would be just a boring chunk of text, but we can fix that.

In our Meal component we pick up the meal ID and pass it into another API call which is used for getting specific recipe data - recipes/your-meal-id/information. For this one we need just two pieces of data which we already have - the meal's ID and our API key (which you got by registering on Spoonacular's website, right?).

This function returns a response loaded with all sorts of data. We don't need 99% of it, but you can certainly use some of it to expand this app if you want to. For this use case I am just plucking the image out of there and passing it into an image tag.

We are making this API call inside of useEffect because we want it to trigger just once, when we create the component. To make sure that happens you need to pass in the [meal.id] as a second parameter, right after our function.

We are also displaying the meal title, preparation time, number of servings and a link to the original recipe. But, like I said, you can add a bunch of different things here. You are free to, for example, not use a recipe Url, but show the complete recipe right there on our page.

# Adding styles

The whole app is pretty much done at this point if you don't want to add any more functionalities to it. It looks pretty ugly, though, but we can fix that by adding some CSS. I wanted to keep it simple, so I've added a bit of color to it and some element separation with margins and padding. I also aligned and centered everything with flexbox and made it fit more nicely into smaller screens. Here is what my index.css file looks like:

```css
/* index.css */

* {
  margin: 0;
  padding: 0;
}

body {
  font-family: "Roboto", sans-serif;
  background-color: #f3f3f3;
}

.App {
  display: flex;
  align-items: center;
  flex-direction: column;
}

section {
  margin: 2rem 0 1rem 0;
}

.controls {
  display: flex;
  align-items: center;
  flex-direction: column;
}

input {
  text-align: center;
  padding: 0.5rem;
  margin-bottom: 1rem;
}

button {
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: #7f21eb;
  color: #f3f3f3;
  border: none;
  font-family: "Roboto", sans-serif;
  font-size: 1rem;
}

button:hover {
  background-color: #6c13d1;
  cursor: pointer;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.nutrients ul {
  display: flex;
  width: 35rem;
  justify-content: space-evenly;
}

.meals {
  display: flex;
}

img {
  width: 100%;
  margin-bottom: 1rem;
}

article {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  margin: 0 1rem;
  max-width: 300px;
  box-shadow: 0 4px 8px 2px rgba(77, 77, 77, 0.15);
}

ul {
  list-style: none;
}

.instructions {
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

a {
  text-decoration: none;
  background-color: #7f21eb;
  color: #f3f3f3;
  width: fit-content;
  padding: 0.5rem 1rem;
}

a:hover {
  background-color: #6c13d1;
  cursor: pointer;
}

@media only screen and (max-width: 1024px) {
  .meals {
    flex-direction: column;
    align-items: center;
  }

  .nutrients ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
}
```

There's a lot more things that can be done with this API, but this is it for this tutorial. If you end up building this do send me your creations. Especially if you add more stuff to it, like recipe details, ingredient list, meal preparation instructions or something similar.

You can check out a demo version of this app on <a href="https://codesandbox.io/s/meal-planner-in-react-yd3vo" target="_blank" rel="noopener noreferrer">CodeSandbox</a>.

<hr>
 
<div class="sectionHighlight">You can reach out to me on <a href="https://twitter.com/alekswritescode" target="_blank" rel="noopener noreferrer">Twitter</a> and <a href="https://www.instagram.com/aleks.popovic/" target="_blank" rel="noopener noreferrer">Instagram</a>, where I also post interesting code tidbits and designs.
 
I also have a <a href="https://www.youtube.com/AleksPopovic" target="_blank" rel="noopener noreferrer">YouTube channel</a> where I regularly upload React and web dev tutorials, so if that's your cup of tea feel free to support me by subscribing.</div>
