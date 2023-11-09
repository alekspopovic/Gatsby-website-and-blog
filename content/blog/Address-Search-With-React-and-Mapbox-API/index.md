---
title: "Address Search with React and Mapbox API"
date: "2023-11-09"
description: "If you need a quick and simple solution for address search with autocomplete and geocoding this one is for you."
tags:
  - web
  - react
  - API
featuredImage: address.png
---

If you need a quick and simple solution for address search with autocomplete and geocoding this one is for you.

To set up this project you will need to get a Mapbox API key, or token, as they call it, from their <a href="https://www.mapbox.com/" target="_blank" rel="noreferrer">official website</a>. You can get started for free and use the API up to a limit, which is pretty generous, at least for a prototype app. You will have up to 100,000 free Search API requests (used for address search and autocomplete suggestions) and up to 50,000 free Map API requests (used for loading/generating a map of the selected location), after which you will have to pay to continue using the service. For this reason you will be asked to enter your credit card details in order to be able to get your API key, so be prepared for that.

If you would prefer a video version of this tutorial you can watch me build the Address Search app with React and Mapbox on Youtube:

<iframe width="560" height="315" src="https://www.youtube.com/embed/sxH5Qpd06uY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

I started a new React app through <a href="https://vitejs.dev/" target="_blank" rel="noreferrer">Vite</a> by running:

```bash
yarn create vite
```

If you don't use yarn you can find detailed scaffolding instructions on <a href="https://vitejs.dev/guide/#scaffolding-your-first-vite-project" target="_blank" rel="noreferrer">Vite's Getting Started page</a>.

For this project we are going to use several additional packages - axios, mapbox-gl, react-map-gl and sass. Axios is going to be used for fetching the autocomplete suggestions and isn't necessary if you don't want to use it. Sass is optional as well. I use it as a personal preference, but you can do the whole project with vanila CSS if you want to, just make sure to adjust your selectors accordingly. To install all of them run:

```bash
yarn add axios mapbox-gl react-map-gl sass
```
or
```bash
npm install axios mapbox-gl react-map-gl sass
```

I am also going to use an image for the map pin, or marker, which you can grab <a href="https://github.com/alekspopovic/mapbox-geocoding/blob/main/src/assets/pointer.svg" target="_blank" rel="noreferrer">from my GitHub repo</a> if you want to use the same one. Make sure to put it in your `/src/assets` folder.

Final peace of setup that you need to do before continuing is configuring your environment variable. If you are working with Vite like me you need to create a new file called `.env.local` in your project's root and add this property to it.

```jsx
VITE_TOKEN = "YOUR_MAPBOX_TOKEN"
```

Make sure to replace the string with your actual Mapbox token. Your variable need to be prefixed with `VITE_`, so make sure to not remove that part. Bare in mind that this will make your token visible in the client if you intend to publish this app somewhere, or add this functionality to your existing web app. To prevent the misuse of your token Mapbox has in place a couple of options, such as limiting the scope of functionalities that can be accessed with the token, and also restricting the token use to a specific URL. As the safest option you can choose to handle all of the API stuff in the backend, which is out of the scope of this tutorial. After you have your token in place we can proceed with creating components.

To start off I made a new folder called `components` and in there I added three new components called `AddressForm.jsx`, `AutoCompleteInput.jsx` and `Map.jsx`. Each component has its own `.scss` file with the same name and I've put all of them in a new folder called `styles`.  To being I've imported `AddressForm` and `Map` components into `App.jsx`, and added some simple state handling. Here is what the `App.jsx` looks like.

```jsx
// App.js

import "./App.scss";
import AddressForm from "./components/AddressForm";
import Map from "./components/Map";
import "mapbox-gl/dist/mapbox-gl.css"; 
import { useState } from "react";

function App() {
  const [address, setAddress] = useState({
    streetAndNumber: "",
    place: "",
    region: "",
    postcode: "",
    country: "",
    latitude: "",
    longitude: "",
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (address.streetAndNumber) {
      console.log("Selected address:", address);
    }
  };

  const updateCoordinates = (latitude, longitude) => {
    setAddress({ ...address, latitude, longitude });
  };

  return (
    <div className="App">
      <AddressForm
        onSubmit={handleFormSubmit}
        address={address}
        setAddress={setAddress}
      />
      {address.longitude && address.latitude && (
        <Map
          longitude={address.longitude}
          latitude={address.latitude}
          updateCoordinates={updateCoordinates}
        />
      )}
    </div>
  );
}

export default App;
```
Don't forget to import `mapbox-gl/dist/mapbox-gl.css`, as this is additional styling required for the map to render properly.

We are setting our state to an object which contains all of the address properties we will be getting from the API, and we are initializing them to an empty value.

The `handleFormSubmit` is an optional function which you can skip if you don't need it. We are using it to confirm our final address has been set after selecting one of the autocomplete suggestions and submitting the form, but also after manually changing one of the inputs and then submitting.

In case you want to manually adjust the map marker position in the end, and consequently the final map coordinates - we will use the `updateCoordinates` function which keeps the old state and changes just the latitude and longitude.

We will display the `Map` component conditionally, only if we have the address coordinates in place. We are also passing in several props to both components.

Here is what the `AddressForm` component looks like.

```jsx
// AddressForm.jsx

import "../styles/AddressForm.scss";
import AutoCompleteInput from "./AutoCompleteInput";

export default function AddressForm({ address, onSubmit, setAddress }) {
  const handleManualInputChange = (event, stateProperty) => {
    const newAddress = { ...address };
    newAddress[stateProperty] = event.target.value;

    setAddress(newAddress);
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <label htmlFor="address">Address</label>
      <AutoCompleteInput
        setAddress={setAddress}
        handleManualInputChange={handleManualInputChange}
        streetAndNumber={address.streetAndNumber}
      />

      <label htmlFor="city">City</label>
      <input
        type="text"
        id="city"
        placeholder="City"
        value={address.place}
        onChange={(event) => handleManualInputChange(event, "place")}
      />

      <label htmlFor="state">State/Province/Region</label>
      <input
        type="text"
        id="state"
        placeholder="State/Province/Region"
        value={address.region}
        onChange={(event) => handleManualInputChange(event, "region")}
      />

      <label htmlFor="postcode">Postcode</label>
      <input
        type="text"
        id="postcode"
        placeholder="Postcode"
        value={address.postcode}
        onChange={(event) => handleManualInputChange(event, "postcode")}
      />

      <label htmlFor="country">Country</label>
      <input
        type="text"
        id="country"
        placeholder="Country"
        value={address.country}
        onChange={(event) => handleManualInputChange(event, "country")}
      />

      <div className="buttons">
        <button type="submit" className="confirm-button">
          Confirm
        </button>
        <button
          type="reset"
          className="reset-button"
          onClick={() =>
            setAddress({
              streetAndNumber: "",
              place: "",
              region: "",
              postcode: "",
              country: "",
              latitude: "",
              longitude: "",
            })
          }
        >
          Reset
        </button>
      </div>
    </form>
  );
}
```
It looks big, but it's mostly just a form with several input fields and their labels. We are also importing our `AutoCompleteInput` which we will implement next. 

All inputs have an `onChange` event which calls our `handleManualInputChange` function which takes in the property name that needs to be manually changed in our state and sets it to the input's value. We are also passing in this function as a prop to the `AutoCompleteInput` component which will also implement it.

There is also a `reset` button which just resets our address state to our default object with empty address properties. We can now continue with setting up the `AutoCompleteInput` component which looks like this.

```jsx
//AutoCompleteInput.jsx

import "../styles/AutoCompleteInput.scss";
import { useState } from "react";
import getPlaces from "../API/getPlaces";

export default function AutoCompleteInput({
  handleManualInputChange,
  setAddress,
  streetAndNumber,
}) {
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (event) => {
    handleManualInputChange(event, "streetAndNumber");
    handleInputChange(event.target.value);
  };

  const handleInputChange = async (query) => {
    const suggesions = await getPlaces(query);
    setSuggestions(suggesions);
  };

  const handleSuggestionClick = (suggestion) => {
    const streetAndNumber = suggestion.place_name.split(",")[0];
    const latitude = suggestion.center[1];
    const longitude = suggestion.center[0];

    const address = {
      streetAndNumber,
      place: "",
      region: "",
      postcode: "",
      country: "",
      latitude,
      longitude,
    };

    suggestion.context.forEach((element) => {
      const identifier = element.id.split(".")[0];

      address[identifier] = element.text;
    });

    setAddress(address);
    setSuggestions([]);
  };

  return (
    <div>
      <div className="autoCompleteInputContainer">
        <input
          id="address"
          type="text"
          placeholder="Address"
          value={streetAndNumber}
          onChange={handleChange}
        />
        <ul className="addressSuggestions">
          {suggestions?.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion.place_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```
We have an input which implements our `handleManualInputChange` function, but also calls our `getPlaces` function which we will use to fetch the address suggestions, which we will then store with `useState`. We will map out every suggestion in a list below the input and assign to each of them an `onClick` event which will handle getting all of the address properties from that suggestion and storing our newly selected address in state.

To get the `streetAndNumber` we need to split `suggestion.place_name` property over a comma, because only the first part before the comma is the actual street name and the address number.

Latitude and longitude are stored in `suggestion.center` property which is an array with just those two values.

Rest of the properties we need to extract from `suggestion.context` property, which is an array of objects which have two properties inside - `id` and `text`. The `id` has values which correspond to our address property names, but they also have a dot followed buy a three digit number. For example, an `id` might have values such as `place.346`, or `country.834`, or `region.772`. That's why we are splitting this value over the `.` and taking the first value, which is our property name. Then we are setting that property name in our state to the `text` value, which is our actual country, city etc.

Once all of the existing properties are set we update our address state, and clear our suggestions state.

In order for this to work we must now implement our `getPlaces` function which will fetch our addresses.

```js
// getPlaces.js

import axios from "axios";

export default async function getPlaces(query) {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
      {
        params: {
          access_token: import.meta.env.VITE_TOKEN,
        },
      }
    );

    return response.data.features;
  } catch (error) {
    console.error("There was an error while fetching places:", error);
  }
}
```
We are using the value from the input as our query value that will be searched through the API call. We also need to pass in our `access_token` as a parameter, and return `response.data.features` property, which is a list of our matching addresses. If there is an error we handle it in the `catch` block.

If you go back and start typing into the `AutoCompleteInput` you should get back suggestions from the API, and if you click on one of them it should get stored in our state. But, we still have one more step, and that is generating a map that points to our selected address, so let's implement our `Map` component.

```jsx
// Map.jsx

import "../styles/Map.scss";
import PointerIcon from "../assets/pointer.svg";
import ReactMapGl, { Marker } from "react-map-gl";
import { useState, useEffect } from "react";

const TOKEN = import.meta.env.VITE_TOKEN;

function Map({ longitude, latitude, updateCoordinates }) {
  const [viewport, setViewport] = useState({
    latitude,
    longitude,
    zoom: 16,
  });

  const [marker, setMarker] = useState({
    latitude,
    longitude,
  });

  useEffect(() => {
    setViewport((oldViewport) => ({
      ...oldViewport,
      latitude,
      longitude,
    }));
  }, [latitude, longitude]);

  const handleMarkerDrag = (event) => {
    const latitude = event.lngLat.lat;
    const longitude = event.lngLat.lng;

    setMarker({ latitude, longitude });

    updateCoordinates(latitude, longitude);
  };

  return (
    <div className="map">
      <ReactMapGl
        {...viewport}
        mapboxAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        onMove={(event) => {
          setViewport(event.viewState);
        }}
      >
        <Marker
          latitude={marker.latitude}
          longitude={marker.longitude}
          draggable={true}
          onDragEnd={handleMarkerDrag}
        >
          <img className="marker" src={PointerIcon} />
        </Marker>
      </ReactMapGl>
    </div>
  );
}

export default Map;
```
`Viewport` is a configuration object for the `ReactMapGl` component. At it's most basic setting it should contain at least your `latitude` and `longitude` so it knows where to center the map view. If you remember, we are rendering our `Map` component conditionally only if there are existing coordinates in our state, so the default state values for `viewport` should be properly handled through our props. The `zoom` property handles the zoom level of the map, which you might adjust based on your preferences and use-case.

We are also handling marker coordinates in a separate state. You don't necessarily need to do this, but depending on if you want to handle your viewport and marker separately you might want to.

In order to generate the map we must use the `mapboxAccessToken` prop in `ReactMapGl` and set its value to our Mapbox token. The `mapStyle` prop determines the look and style of the map, and if you want to use a different map type you can find other values in Mapbox's documentation on their website. 

The `onMove` prop handles the panning or dragging of the map. The event that gets automatically passed to us has a `viewState` property which we can use to set our `viewport` to our new value which will re-center the map to that point.

Inside of `ReactMapGl` component we are adding the `Marker` component. Both of these are a part of the `react-map-gl` package. Marker has props for longitude and latitude which determine its position. We are also setting its `draggable` prop to `true`, so it can be dragged, and `onDragEnd` is the prop which handles what happens when we are done dragging the marker, so we are passing our `handleMarkerDrag` function to it. This function updates our marker's coordinates, and also our address coordinates, which will update the viewport and re-center our map to marker's new location. If you don't want for your map to move with the marker you would implement that part a bit differently.

Inside of the `Marker` we are adding an `img` element which uses our `PointerIcon` as its `src`. The `Marker` handles the marker's behaviour, and the `img` handles the marker's look.

That's it as far as our functionalities go. If you want to style the app the same way I did you can use the following code. Make sure to put all of these files in your styles folder, except for the `App.scss`. I won't go through them in detail as we are mainly just setting up some colors, centering things, and adding some additional space in the form of margins and paddings. If you are using vanila CSS for this just change your file extensions to `.css` and adjust the selectors accordingly.

```scss
// App.scss

@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

body {
  margin: 0;
  background: linear-gradient(30deg, rgb(0, 39, 65), rgb(0, 91, 151));
  color: white;
  font-family: "Poppins", sans-serif;
}

#root {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.App {
  display: flex;
  width: 1000px;
  justify-content: center;
}

@media only screen and (max-width: 700px) {
  .App {
    flex-direction: column;
    align-items: center;
  }

  #root {
    justify-content: start;
  }
}
```

```scss
// AddressForm.scss

.form {
  display: flex;
  flex-direction: column;
  padding: 2em;
  margin-right: 3em;

  label {
    margin-bottom: 4px;
    width: 100%;
    text-align: left;
  }

  input {
    width: 250px;
    padding: 0.75em;
    margin-bottom: 0.5em;
    border: 1px solid white;
    border-radius: 4px;
    font-family: "Poppins", sans-serif;
  }

  .buttons {
    display: flex;
    margin-top: 1em;

    button {
      padding: 1em 2em;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-family: "Poppins", sans-serif;
      background-color: rgb(0, 194, 120);

      &.confirm-button {
        margin-right: 1em;
      }

      &.reset-button {
        background-color: rgb(255, 65, 43);
      }
    }
  }
}
```

```scss
// AutoCompleteInput.scss

.autoCompleteInputContainer {
  position: relative;

  .addressSuggestions {
    position: absolute;
    top: 1.75em;
    background-color: white;
    border: 1px solid black;
    overflow: hidden;
    border-radius: 4px;
    color: black;
    z-index: 999;
    padding: 0;

    li {
      list-style: none;
      border-bottom: 1px solid black;
      padding: 0.5em 1em;

      &:hover {
        background-color: rgb(22, 66, 128);
        color: white;
        cursor: pointer;
      }
    }
  }
}
```

```scss
// Map.scss

.map {
  width: 400px;
  height: 400px;
  margin: auto 0;

  .marker {
    width: 50px;
    height: 50px;
  }
}

@media only screen and (max-width: 700px) {
  .map {
    margin-bottom: 2em;
  }
}
```

With that our Address Search app with autocomplete and map generation is finished. You can of course expand it with other interesting functionalities. You may want to add debounce or throttling to the `AutoCompleteInput` to prevent fetching the suggestions with each keyboard click. As discussed previously, you should handle the API key and calls in a more secure way if you decide to use this in production. You may also decide to handle the form submit in a better way that suits more to your use-case, instead of just logging the final address. 

If you do end up improving this app send me a message. I would love to see your creations!

<hr>
 
<div class="sectionHighlight">If you have any questions or comments you can reach out to me on <a href="https://twitter.com/alekswritescode" target="_blank" rel="noopener noreferrer">Twitter</a> and <a href="https://www.instagram.com/aleks.popovic/" target="_blank" rel="noopener noreferrer">Instagram</a>, where I also post interesting code tidbits and designs.
 
I also have a <a href="https://www.youtube.com/AleksPopovic" target="_blank" rel="noopener noreferrer">YouTube channel</a> where I regularly upload React and web dev tutorials, so if that's your cup of tea feel free to support me by subscribing.</div>
