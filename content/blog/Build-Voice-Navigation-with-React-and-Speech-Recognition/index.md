---
title: "Build Voice Navigation with React and Speech Recognition"
date: "2020-12-19"
description: "Until a few days ago I had no idea voice control and speech recognition were such a big deal. I lost the link to it, but according to an article I read, a big percentage of population likes to talk into their phones and home assistants. Maybe I am getting old, since it looked like the age group that uses it the most is 16-24? I think that's great (using the tech, not me getting old). Not only does it promote even more accessibility on the web, but it also gives us a glimpse into a future where we are no longer slaves to our clumsy fingers. I personally make too many typing mistakes, both on PC and smartphone keyboards."
tags:
  - web
  - react
featuredImage: voice.png
---

Until a few days ago I had no idea voice control and speech recognition were such a big deal. I lost the link to it, but according to an article I read, a big percentage of population likes to talk into their phones and home assistants. Maybe I am getting old, since it looked like the age group that uses it the most is 16-24? I think that's great (using the tech, not me getting old). Not only does it promote even more accessibility on the web, but it also gives us a glimpse into a future where we are no longer slaves to our clumsy fingers. I personally make too many typing mistakes, both on PC and smartphone keyboards.

I don't see that many voice controlled websites and it got me thinking. Can I make one? Something where you could just utter a command and some speech recognition algorithm would translate it into an operation like clicking a link, or straight up redirecting you to a page you asked. 

It turns out it's not that hard at all, so I made a concept app with a voice controlled navigation menu in React. Here is how you can build it too, or just use the knowledge gained here to make your own voice controlled apps.

If you prefer a video version of this tutorial you can watch it here:

<iframe width="560" height="315" src="https://www.youtube.com/embed/r3tiBJagbic" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

We start off by creating a new React app by running create-react-app command.

```
create-react-app voice-navigation
```

There are two npm modules that we need to install for this to work. The first one is  <a href="https://www.npmjs.com/package/react-router-dom" target="_blank" rel="noopener noreferrer">react-router-dom</a>, which we need for setting up multi-page navigation. We are not going to make a deep dive into React routing, but I will show you how to make a basic navigation with it.

You can install it by running

```
npm i react-router-dom
```

The second one is <a href="https://www.npmjs.com/package/react-speech-recognition" target="_blank" rel="noopener noreferrer">react-speech-recognition</a> which we will use to convert our voice into JavaScript commands.

You can install it by running

```
npm i react-speech-recognition
```

I went ahead and set up a components folder and I started adding files to it. We are going to make several page components that we are going to pass into our router. They will pretty much act as our website pages which will be loaded when we click a menu item, or say a voice command. I made some simple function components that just return a heading.

```jsx
// Home.js

import React from "react";

export default function Home() {
  return <h1>Welcome to HOME page</h1>;
}
```

```jsx
// Contact.js

import React from "react";

export default function Contact() {
  return <h1>Welcome to CONTACT page</h1>;
}
```

```jsx
// Blog.js

import React from "react";

export default function Blog() {
  return <h1>Welcome to BLOG page</h1>;
}
```

```jsx
// NewBlogPost.js

import React from "react";

export default function NewBlogPost() {
  return <h1>Start adding your NEW BLOG POST here</h1>;
}
```

We just want something in there to give us a visual que when we switch between pages.

All of our logic will go into the App.js component. To set it up I removed most of the create-react-app's stuff until I was left with a simple function component and I started importing my pages and plugins.

```jsx
// App.js

import React, { useState } from "react";
import HomePage from "./Home";
import BlogPage from "./Blog";
import NewBlogPostPage from "./NewBlogPost";
import ContactPage from "./Contact";
import { 
  BrowserRouter, Route, Link, Redirect 
} from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function App() {
  return (
    <div className="App"></div>
  );
}

export default App;
```

Now we need to set up our navigation by using the BrowserRouter which we imported above. First we need to add our links, and React Router has a very neat component that is literally called Link. It's used for setting up internal urls for use-cases just like this. Instead of href we pass in a "to" prop.

```jsx
import React, { useState } from "react";
import HomePage from "./Home";
import BlogPage from "./Blog";
import NewBlogPostPage from "./NewBlogPost";
import ContactPage from "./Contact";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div id="links">
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/blog/new">Add Blog Post</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
```

Next we need to set up our page routing. Here is what our component should look like after that:

```jsx
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div id="links">
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/blog/new">Add Blog Post</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <Route path="/" exact component={HomePage} />
        <Route path="/home" component={HomePage} />
        <Route path="/blog" exact component={BlogPage} />
        <Route path="/blog/new" component={NewBlogPostPage} />
        <Route path="/contact" component={ContactPage} />
      </BrowserRouter>
    </div>
  );
}
```

Route component is used to "tell" our app what should it do when we hit a certain route. We pass in two props, a path and the component which we want to load for it.

For example, if we hit the website root ("/") we want to display the HomePage component (which we imported from Home.js). If we hit "/contact" we want to show the ContactPage component etc. 

When we add "exact" to a Route it means the route must be, well, exact, and not a part of a different route. If we didn't have that set up for our root the home component would show up on each page. For example, if you would go to /contact we would technically hit both the root and contact, since contact is part of the root.

Our basic navigation is now complete, so we can proceed with adding the voice recognition. First, we need to set up a simple useState hook for keeping track of the page that we want to redirect to.

```jsx
const [redirectUrl, setRedirectUrl] = useState("");
```


Now we can set up our commands object which will have a simple command and its callback which will call the setRedirectUrl function. Here is what that looks like.

```jsx
const commands = [
  {
    command: ["Open *"],
    callback: (redirectPage) => setRedirectUrl(redirectPage),
  },
];
```

The star / asterisk is a wildcard symbol which will "pick up" whatever we say and pass it into the callback function as a parameter. For instance, if we say "Open blog", it will pick up the word "blog" and use it as a parameter to set up our state.

Now we can take our commands object and pass it into the speech recognition hook.

```jsx
const { transcript } = useSpeechRecognition({ commands });
```

Setting up this hook like this makes it so when we order our speech recognition to start listening - whatever we say will be stored in the transcript property. Also, if what we have said matches with one or our commands - its callback will be executed. We can also use this property to display whatever we've said on the page.

```jsx
<p id="transcript">Transcript: {transcript}</p>
```

We can now add a button to activate the speech recognition listener.

```jsx
<button onClick={SpeechRecognition.startListening}>Start</button>
```

Since not all browsers support speech recognition we should also add a check for support.

```jsx
if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
  return null;
}
```

Your component should now look something like this:

```jsx
function App() {
  const commands = [
    {
      command: ["Open *"],
      callback: (redirectPage) => setRedirectUrl(redirectPage),
    },
  ];

  const { transcript } = useSpeechRecognition({ commands });
  const [redirectUrl, setRedirectUrl] = useState("");

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div id="links">
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/blog/new">Add Blog Post</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <Route path="/" exact component={HomePage} />
        <Route path="/home" component={HomePage} />
        <Route path="/blog" exact component={BlogPage} />
        <Route path="/blog/new" component={NewBlogPostPage} />
        <Route path="/contact" component={ContactPage} />
      </BrowserRouter>

      <p id="transcript">Transcript: {transcript}</p>

      <button onClick={SpeechRecognition.startListening}>Start</button>
    </div>
  );
}

export default App;

```

We are almost done. Now we need to check if our state property (redirectUrl) was changed by speech recognition and do something about it if it was.

To do that we will set up two helper properties.

```jsx
  const pages = ["home", "blog", "new blog post", "contact"];
  const urls = {
    home: "/",
    blog: "/blog",
    "new blog post": "/blog/new",
    contact: "/contact",
  };
```

Pages array is essentially a list of our pages, and urls is an object in which we map our pages to their respective urls. You can absolutely do the url lookup without using the array, but the code will be a bit more readable this way, in my opinion.

Now we need to check if redirectUrl has a value and set up our redirect if it does.

```jsx
  let redirect = "";

  if (redirectUrl) {
    if (pages.includes(redirectUrl)) {
      redirect = <Redirect to={urls[redirectUrl]} />;
    } else {
      redirect = <p>Could not find page: {redirectUrl}</p>;
    }
  }

```

Redirect is another React Router's component which is, as its name implies, used for redirecting. If speech recognition picks up a page from our command it will set it up as our redirectUrl state property. We can then check if our pages array contains that page. If it does - we find its url from our urls object and pass it into the Redirect component. If it doesn't we instead set up a message saying the page wasn't found. We also need to make sure to set up the Redirect component inside of our BrowserRouter, since it won't work outside of it.

Here is the final look of our App component:

```jsx
import React, { useState } from "react";
import HomePage from "./Home";
import BlogPage from "./Blog";
import NewBlogPostPage from "./NewBlogPost";
import ContactPage from "./Contact";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function App() {
  const commands = [
    {
      command: ["Open *"],
      callback: (redirectPage) => setRedirectUrl(redirectPage),
    },
  ];

  const { transcript } = useSpeechRecognition({ commands });
  const [redirectUrl, setRedirectUrl] = useState("");
  const pages = ["home", "blog", "new blog post", "contact"];
  const urls = {
    home: "/",
    blog: "/blog",
    "new blog post": "/blog/new",
    contact: "/contact",
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  let redirect = "";

  if (redirectUrl) {
    if (pages.includes(redirectUrl)) {
      redirect = <Redirect to={urls[redirectUrl]} />;
    } else {
      redirect = <p>Could not find page: {redirectUrl}</p>;
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div id="links">
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/blog/new">Add Blog Post</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <Route path="/" exact component={HomePage} />
        <Route path="/home" component={HomePage} />
        <Route path="/blog" exact component={BlogPage} />
        <Route path="/blog/new" component={NewBlogPostPage} />
        <Route path="/contact" component={ContactPage} />

        {redirect}
      </BrowserRouter>

      <p id="transcript">Transcript: {transcript}</p>

      <button onClick={SpeechRecognition.startListening}>Start</button>
    </div>
  );
}

export default App;

```

If you want to add some CSS to this, here is what I've used inside of the index.css file. I've just set up some simple colors, centered everything, and added some spacing between all page elements.

```css
@import url("https://fonts.googleapis.com/css2?family=Acme&display=swap");

* {
  margin: 0;
  padding: 0;
}

body {
  width: 100vw;
  height: 100vh;
  background-color: #eeeeee;
  color: #242225;
  font-family: "Acme", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

#links {
  margin-bottom: 2rem;
}

a {
  margin: 0 1rem;
  text-decoration: none;
  color: rgb(25, 122, 202);
}

a:hover {
  text-decoration: underline;
}

h1 {
  margin-bottom: 1rem;
}

#transcript {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

button {
  background-color: rgb(25, 122, 202);
  color: #eeeeee;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
}

button:hover {
  background-color: rgb(22, 101, 167);
  cursor: pointer;
}
```

If you followed everything you should now have a functioning speech recognition which you can activate by clicking a button and it will load up the pages you ask it to. There is of course a lot of things that can be improved here, but as a starting concept I think it's a really interesting functionality.

In a real world situation there wouldn't be much point in clicking a button every time you want to say a command. You could instead have another state property which tracks if the voice recognition was turned on and it could keep it on while you are using the website.

You would also set up the routing outside of your main component, and everything in general could be made to be more modular. You could add more versatile commands to cover sentence variations and implement other voice controlled functionalities.

If you are interested into seeing the full working version you can check out <a href="https://codesandbox.io/s/voice-navigation-p1o3j" target="_blank" rel="noopener noreferrer">the project on CodeSandbox</a>.

If you have any questions or comments you can reach out to me on <a href="https://twitter.com/alekswritescode" target="_blank" rel="noopener noreferrer">Twitter</a> and <a href="https://www.instagram.com/aleks.popovic/" target="_blank" rel="noopener noreferrer">Instagram</a>, where I also post interesting code tidbits and designs. Feel free to send me your own implementations of the project, especially if you decide to expand on it.

I also regularly upload React and web dev tutorials to YouTube, so if that's your cup of tea feel free to support me by subscribing to <a href="https://www.youtube.com/AleksPopovic" target="_blank" rel="noopener noreferrer">my channel</a>.
