---
title: "Easy Customizable Star Rating Component in React"
date: "2023-11-14"
description: "In this tutorial you will learn how to set up a simple, yet pretty customizable star rating component in React. You know those little stars that you use to rate stuff all over the internet? We will build those as a default use-case, but we will also add support for other text-based and emoji-based icons that you can use instead of little yellow stars."
tags:
  - web
  - react
  - component
featuredImage: rating.png
---

In this tutorial you will learn how to set up a simple, yet pretty customizable star rating component in React. You know those little stars that you use to rate stuff all over the internet? We will build those as a default use-case, but we will also add support for other text-based and emoji-based icons that you can use instead of little yellow stars.

If you would prefer a video version of this tutorial you can watch me build this component in React on Youtube:

<iframe width="560" height="315" src="https://www.youtube.com/embed/J-gURMj3M6A" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

I started a new React app through <a href="https://vitejs.dev/" target="_blank" rel="noreferrer">Vite</a> by running:

```bash
yarn create vite
```

If you don't use yarn you can find detailed scaffolding instructions on <a href="https://vitejs.dev/guide/#scaffolding-your-first-vite-project" target="_blank" rel="noreferrer">Vite's Getting Started page</a>.

For this component we won't use any additional libraries, so we can jump straight into it.

I created a file for my component and I called it `Stars.jsx`. I also created a separate styles file which I called `Stars.css`. Since this is a simple mini project I've left them in the `/src/` folder, so if you are plugging these into your existing project you will have to make some adjustments.

I started off by adding some simple CSS to my `App.css` file, which I used to set up the page background color and to center stuff on screen. If you plan to add this component to an existing project you can skip this step.

```scss
//App.css

body {
  background: rgb(39, 39, 39);
  color: white;
}

#root {
  max-width: 1280px;
  margin: 0 auto;
  text-align: center;

  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

We will initialize the `Stars.jsx` component and add some default properties and props to it.

```jsx
import "./Stars.css";

const DEFAULT_COUNT = 5;
const DEFAULT_ICON = "★";
const DEFAULT_UNSELECTED_COLOR = "grey";
const DEFAULT_COLOR = "yellow";

export default function Stars({ count, defaultRating, icon, color, iconSize }) {
  return (
    <div className="starsContainer"></div>
  );
}
```
The idea here is that we want our use-case to be the 5/5 yellow star rating component, so we need to set up our default properties to reflect that. We will continue with setting up our state and mapping out an appropriate number of stars.

```jsx
import "./Stars.css";
 // highlight-start
import { useState } from "react";
 // highlight-end

const DEFAULT_COUNT = 5;
const DEFAULT_ICON = "★";
const DEFAULT_UNSELECTED_COLOR = "grey";
const DEFAULT_COLOR = "yellow";

export default function Stars({ count, defaultRating, icon, color, iconSize }) {
   // highlight-start
  const [rating, setRating] = useState(defaultRating);
  const [temporaryRating, setTemporaryRating] = useState(0);

  let stars = Array(count || DEFAULT_COUNT).fill(icon || DEFAULT_ICON);
   // highlight-end

  return (
    <div className="starsContainer">
      // highlight-start
      {stars.map((item, index) => {
        return (
          <div className="star" key={index}>
            {icon ? icon : DEFAULT_ICON}
          </div>
        );
      })}
      // highlight-end
    </div>
  );
}
```

We will use `temporaryRating` as a helper property to visually display which rating will be set once we click on a star, and we will track that final rating in the `rating` property.

We are setting up an array which has the number of elements that we need and we are mapping through it to create new elements which contain our stars, or a different icon that we've set. Now would be an appropriate time to quickly jump into our `Stars.css` file and add some very light CSS which will fix our stars not being properly positioned.

```scss
.starsContainer {
  display: flex;
}

.star {
  cursor: pointer;
  transition: all 0.1s linear;
}

.star:hover {
  transform: scale(1.1);
}
```

I told you it's going to be light. We are just adding flex to our container to make the stars fit in a single row by default. We are also adding a slight transition effect on hover where we are bumping the icon size a bit when me mouse over it. 

We can now go back to the component. Our next order of business is to determine when and how to change our icon color from grey to yellow (or any other color that you've set up through props).

```jsx
// .starsContainer in Stars.jsx

<div className="starsContainer">
  {stars.map((item, index) => {
    //highlight-start
    const isActiveColor =
      (rating || temporaryRating) &&
      (index < rating || index < temporaryRating);

    let elementColor = "";

    if (isActiveColor) {
      elementColor = color || DEFAULT_COLOR;
    } else {
      elementColor = DEFAULT_UNSELECTED_COLOR;
    }
    //highlight-end

    return (
      <div className="star" key={index}>
        {icon ? icon : DEFAULT_ICON}
      </div>
    );
  })}
</div>
```
We will use `isActiveColor` as a helper property to figure out when should the icon have the "active" color. There are two main parts to it.

The first one says we need to have a `rating` or a `temporary` rating. If we don't have any rating set up then there is no need to change the color of any icon. The `rating` covers the use-case of loading the component which already has its state set up, and the `temporaryRating` covers the use-case of using our mouse to hover the component and preview the rating which we want to set.

The second part compares our current icon's index to `rating` and `temporaryRating`. Since array index in `JavaScript` starts from 0 we need to make sure the index has a strictly smaller value then our two ratings. For example, if our rating is 1/5 we need to color just the first star, which has the index of 0, which is smaller than 1.

Now that we know when the icon should have the "active" color we can use `elementColor` as a helper property to set the appropriate color. If we've passed in the `color` prop we will use that, otherwise we will use the `DEFAULT_COLOR`. If "active" color does not need to be set then we use the `DEFAULT_UNSELECTED_COLOR`. We can now proceed with actually using these properties to change the look of our icons.

```jsx
// return statement in Stars.jsx

return (
  <div
    className="star"
    key={index}
    //highlight-start
    style={{
      fontSize: iconSize ? `${iconSize}px` : "14px",
      color: elementColor,
      filter: `${isActiveColor ? "grayscale(0%)" : "grayscale(100%)"}`,
    }}
    //highlight-end
  >
    {icon ? icon : DEFAULT_ICON}
  </div>
);
```

Remember we want to cover both the text based icons such as `★ or ❤`, but also emoji based icons such as `🌷 or 😍`. To do this we can add the `style` prop and directly set the `color` to our `elementColor`. This covers the text icons, but won't affect the emojis which are going to render in their full color. For that we need to conditionally set the `filter` to `grayscale(100%)` when the "active" color isn't being set, which will grey out emojis, or to `grayscale(0%)` when we are setting the "active" color, but in this case we are just resetting the filter. 

Technically, you could go just with the `filter` approach and ditch the `elementColor`, which will work on the text based icons as well, but the shade of grey will depend on the active color, so your icons might look brighter or darker depending on which base color you chose.

Additionally, we are setting our `fontSize` to an appropriate value if we passed in the `iconSize` prop. If not we are setting it to `14px` by default, which you could also separate into its own `DEFAULT_ICON_SIZE` property if you wanted to.

Next step is to make these colors apply on hover and on click.

```jsx
// return statement in Stars.jsx

return (
  <div
    className="star"
    key={index}
    style={{
      fontSize: iconSize ? `${iconSize}px` : "14px",
      color: elementColor,
      filter: `${isActiveColor ? "grayscale(0%)" : "grayscale(100%)"}`,
    }}
    //highlight-start
    onMouseEnter={() => setTemporaryRating(index + 1)}
    onMouseLeave={() => setTemporaryRating(0)}
    onClick={() => handleClick(index + 1)}
     //highlight-end
  >
    {icon ? icon : DEFAULT_ICON}
  </div>
);
```

When we mouse over the icons we need to set and reset our `temporaryRating`. When we first hover it we use `onMouseEnter` to set the `temporaryRating` to `index + 1` because, as you remember, our index will always be 1 lower than the actual rating. Once we move our mouse outside of the icon we use `onMouseLeave` to set `temporaryRating` back to 0, so it doesn't get stuck on the last hovered value. 

Finally, we use `onClick` to call a new function called `handleClick` which will set the final `rating` to `index + 1`. Inside of this function we will also store our final value in `localStorage` so it will persist afer refreshing the page. Here is what that function looks like.

```jsx
// handleClick function in Stars.jsx

const handleClick = (rating) => {
  setRating(rating);
  localStorage.setItem("starRating", rating);
};
```

We are doing this just for this example, to show what would be the final behavior for a single component. In production you would need to modify this to connect to your actual database where you keep the record of all of your different ratings. Otherwise, all your rating components will be set to the same value. Here is the final look of the full `Stars.jsx` file.

```jsx
// Stars.jsx

import "./Stars.css";
import { useState } from "react";

const DEFAULT_COUNT = 5;
const DEFAULT_ICON = "★";
const DEFAULT_UNSELECTED_COLOR = "grey";
const DEFAULT_COLOR = "yellow";

export default function Stars({ count, defaultRating, icon, color, iconSize }) {
  const [rating, setRating] = useState(defaultRating);
  const [temporaryRating, setTemporaryRating] = useState(0);

  let stars = Array(count || DEFAULT_COUNT).fill(icon || DEFAULT_ICON);

  const handleClick = (rating) => {
    setRating(rating);
    localStorage.setItem("starRating", rating);
  };

  return (
    <div className="starsContainer">
      {stars.map((item, index) => {
        const isActiveColor =
          (rating || temporaryRating) &&
          (index < rating || index < temporaryRating);

        let elementColor = "";

        if (isActiveColor) {
          elementColor = color || DEFAULT_COLOR;
        } else {
          elementColor = DEFAULT_UNSELECTED_COLOR;
        }

        return (
          <div
            className="star"
            key={index}
            style={{
              fontSize: iconSize ? `${iconSize}px` : "14px",
              color: elementColor,
              filter: `${isActiveColor ? "grayscale(0%)" : "grayscale(100%)"}`,
            }}
            onMouseEnter={() => setTemporaryRating(index + 1)}
            onMouseLeave={() => setTemporaryRating(0)}
            onClick={() => handleClick(index + 1)}
          >
            {icon ? icon : DEFAULT_ICON}
          </div>
        );
      })}
    </div>
  );
}
```

Final thing left is to actually use our new component. In my example I will just import it to my `App.jsx` alongside a `localStorage` check to see if we already have a `defaultRating` that we need to pass in.

```jsx
// App.jsx

import "./App.css";
import Stars from "./Stars";

function App() {
  const defaultRating = localStorage.getItem("starRating");

  return (
    <Stars defaultRating={defaultRating} />
  );
}

export default App;
```

To test out other props and customize your new rating component you can try one of these setups, or a combination of them.

```jsx
<Stars icon="❤" color="red" defaultRating={defaultRating} /> // 5/5 red hearts component
<Stars icon="😍" defaultRating={defaultRating} /> // 5/5 smiley face with hearts for its eyes component
<Stars icon="🌷" defaultRating={defaultRating} count={10} /> // 10/10 flower component
```
 
And with that our (star) rating component is finished. It is light and fairly customizable, but depending on your use-case you might want to add more functionalities or customizations to it. Technically, this component will work with `svg` files and images, but you will need to take care of resizing them with CSS.  

Have fun with messing around with it, and if you do end up using or even improving this component send me a message, as I would love to see and hear about your creations!

<hr>
 
<div class="sectionHighlight">If you have any questions or comments you can reach out to me on <a href="https://twitter.com/alekswritescode" target="_blank" rel="noopener noreferrer">Twitter</a> and <a href="https://www.instagram.com/aleks.popovic/" target="_blank" rel="noopener noreferrer">Instagram</a>, where I also post interesting code tidbits and designs.
 
I also have a <a href="https://www.youtube.com/AleksPopovic" target="_blank" rel="noopener noreferrer">YouTube channel</a> where I regularly upload React and web dev tutorials, so if that's your cup of tea feel free to support me by subscribing.</div>
