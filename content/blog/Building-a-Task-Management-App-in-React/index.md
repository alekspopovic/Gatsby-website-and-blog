---
title: "Building a Task Management App in React"
date: "2020-12-12"
description: "Can you become more productive by making a productivity app? Not sure about that, but you can definitely become more productive by building new projects and a task management app has been on my mind for a long time now. I decided to build it in React without using any additional plugins except node-sass which allows you to use .scss files in your project."
tags:
  - web
  - react
featuredImage: task.png
---

Can you become more productive by making a productivity app? Not sure about that, but you can definitely become more productive by building new projects and a task management app has been on my mind for a long time now. I decided to build it in React without using any additional plugins except node-sass which allows you to use .scss files in your project.

If you prefer a video version of this tutorial you can watch me build a task management app on Youtube:

<iframe width="560" height="315" src="https://www.youtube.com/embed/BdCCpAICXVc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

I started a new React app by running create-react-app command in my working folder.

```
create-react-app task-management
```

For this project I will focus more on the React part of the code, but there will be a SandBox link to a full code example that includes the CSS files as well. I mainly used flexbox to center elements, and that's pretty much 80% of the CSS used. The rest is adding custom colors and margins for separation between elements.

To start off - I removed all unnecessary code from App.js and I imported the StatusLine component, which we will use to sort out our tasks based on their status. I added it three times alongside an h1 heading, and I also added function skeletons that we will be implementing later.

```jsx
import { useState, useEffect } from "react"
import "../styles/App.scss"
import StatusLine from "./StatusLine"

function App() {
  const [tasks, setTasks] = useState([])

  function addEmptyTask(status) {
    // do stuff
  }

  function addTask(taskToAdd) {
    // do stuff
  }

  function deleteTask(taskId) {
    // do stuff
  }

  function moveTask(id, newStatus) {
    // do stuff
  }

  function saveTasksToLocalStorage(tasks) {
    // do stuff
  }

  function loadTasksFromLocalStorage() {
    // do stuff
  }

  return (
    <div className="App">
      <h1>Task Management</h1>
      <main>
        <section>
          <StatusLine
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="Backlog"
          />
          <StatusLine
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="In Progress"
          />
          <StatusLine
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="Done"
          />
        </section>
      </main>
    </div>
  )
}

export default App
```

We are passing in all of our task manipulation functions into the StatusLine components because we need to pass them into each individual Task component. We are also adding a status property which will be used to determine task's initial status and to also set up some headings.

Our tasks are going to be stored in an array of objects by using the useState hook. We also imported the useEffect hook because we will use it later to save and load our task data from the browser's localStorage.

Let's start implementing those functions.

```js
function addEmptyTask(status) {
  const lastTask = tasks[tasks.length - 1]

  let newTaskId = 1

  if (lastTask !== undefined) {
    newTaskId = lastTask.id + 1
  }

  setTasks(tasks => [
    ...tasks,
    {
      id: newTaskId,
      title: "",
      description: "",
      urgency: "",
      status: status,
    },
  ])
}
```

We are going to use addEmptyTask() when we start adding a new task, so we just want to set it to the first available ID and leave all other properties empty, except for the status which we will pass into the function from the Task component. If we have no tasks we set the ID to 1 by default. After that we are free to set our state by merging the new empty task object with the existing array of tasks from our state.

```js
function addTask(taskToAdd) {
  let filteredTasks = tasks.filter(task => {
    return task.id !== taskToAdd.id
  })

  let newTaskList = [...filteredTasks, taskToAdd]

  setTasks(newTaskList)

  saveTasksToLocalStorage(newTaskList)
}
```

When we enter all of our task properties we want to save it to our state. But, before that, we want to remove the empty task with the same ID, so we filter our tasks array. After that we merge the new task with the rest of the list and we save everything to local storage (we implement this function later).

```js
function deleteTask(taskId) {
  let filteredTasks = tasks.filter(task => {
    return task.id !== taskId
  })

  setTasks(filteredTasks)

  saveTasksToLocalStorage(filteredTasks)
}
```

Deleting a task is as simple as filtering our tasks array just the way we did it for adding a new task. After that we once again set our state again and save everything in the local storage.

```js
function moveTask(id, newStatus) {
  let task = tasks.filter(task => {
    return task.id === id
  })[0]

  let filteredTasks = tasks.filter(task => {
    return task.id !== id
  })

  task.status = newStatus

  let newTaskList = [...filteredTasks, task]

  setTasks(newTaskList)

  saveTasksToLocalStorage(newTaskList)
}
```

Our moveTask function is going to be used to move a task from one status to the next, or previous one. We filter our tasks list to search for the task that needs to be moved and to remove it from the state so we can change its status. After changing the tasks status we once again merge it back into the state and save everything to local storage.

```js
function saveTasksToLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks))
}
```

Local storage supports only storing string values, but our tasks are stored as an array of objects. To get around this restriction we need to use JSON.stringify to transform our data into a string. After that we call the setItem function which will store our tasks.

```js
function loadTasksFromLocalStorage() {
  let loadedTasks = localStorage.getItem("tasks")

  let tasks = JSON.parse(loadedTasks)

  if (tasks) {
    setTasks(tasks)
  }
}
```

To retrieve our data from the local storage we need to revert our data from a string to an array of objects. For that we use JSON.parse function and then we are free to set our state. In order to call this function only once we need to implement the useEffect hook.

```js
useEffect(() => {
  loadTasksFromLocalStorage()
}, [])
```

We call our function and as a second parameter inside useEffect we pass in an empty array. The second parameter is used to prevent useEffect from triggering on every render. By giving it an array of properties to watch we will activate useEffect only when those properties change. But, if we pass in an empty array the useEffect will trigger only once, on the first page load, and that is exactly what we want.

With all functions implemented we are ready to move on to the StatusLine component.

```jsx
import "../styles/statusLine.scss"
import Task from "./Task"

export default function StatusLine(props) {
  const { status, tasks, addTask, deleteTask, addEmptyTask, moveTask } = props

  let taskList, tasksForStatus

  function handleAddEmpty() {
    addEmptyTask(status)
  }

  if (tasks) {
    tasksForStatus = tasks.filter(task => {
      return task.status === status
    })
  }

  if (tasksForStatus) {
    taskList = tasksForStatus.map(task => {
      return (
        <Task
          addTask={task => addTask(task)}
          deleteTask={id => deleteTask(id)}
          moveTask={(id, status) => moveTask(id, status)}
          key={task.id}
          task={task}
        />
      )
    })
  }

  return (
    <div className="statusLine">
      <h3>{status}</h3>
      {taskList}
      <button onClick={handleAddEmpty} className="button addTask">
        +
      </button>
    </div>
  )
}
```

It may look like there is a lot happening here, but there really isn't. We are picking up all of the props that we passed in from the App component. We use the status prop to filter the task array and display only tasks with that status. If we have tasks in our state we map them into Task components into which we pass in our functions for adding, deleting and moving a task, and also the task data itself. We handle adding an empty task with a simple button with an onClick event.

Now we need to set up our Task component and we are done!

```jsx
import "../styles/task.scss"
import { useState } from "react"

export default function Task(props) {
  const { addTask, deleteTask, moveTask, task } = props

  const [urgencyLevel, setUrgencyLevel] = useState(task.urgency)
  const [collapsed, setCollapsed] = useState(task.isCollapsed)
  const [formAction, setFormAction] = useState("")

  function setUrgency(event) {
    setUrgencyLevel(event.target.attributes.urgency.value)
  }

  function handleSubmit(event) {
    // do stuff
  }

  function handleMoveLeft() {
    // do stuff
  }

  function handleMoveRight() {
    // do stuff
  }

  return (
    <div className={`task ${collapsed ? "collapsedTask" : ""}`}>
      <button onClick={handleMoveLeft} className="button moveTask">
        &#171;
      </button>
      <form onSubmit={handleSubmit} className={collapsed ? "collapsed" : ""}>
        <input
          type="text"
          className="title input"
          name="title"
          placeholder="Enter Title"
          disabled={collapsed}
          defaultValue={task.title}
        />
        <textarea
          rows="2"
          className="description input"
          name="description"
          placeholder="Enter Description"
          defaultValue={task.description}
        />
        <div className="urgencyLabels">
          <label className={`low ${urgencyLevel === "low" ? "selected" : ""}`}>
            <input
              urgency="low"
              onChange={setUrgency}
              type="radio"
              name="urgency"
            />
            low
          </label>
          <label
            className={`medium ${urgencyLevel === "medium" ? "selected" : ""}`}
          >
            <input
              urgency="medium"
              onChange={setUrgency}
              type="radio"
              name="urgency"
            />
            medium
          </label>
          <label
            className={`high ${urgencyLevel === "high" ? "selected" : ""}`}
          >
            <input
              urgency="high"
              onChange={setUrgency}
              type="radio"
              name="urgency"
            />
            high
          </label>
        </div>
        <button
          onClick={() => {
            setFormAction("save")
          }}
          className="button"
        >
          {collapsed ? "Edit" : "Save"}
        </button>
        {collapsed && (
          <button
            onClick={() => {
              setFormAction("delete")
            }}
            className="button delete"
          >
            X
          </button>
        )}
      </form>
      <button onClick={handleMoveRight} className="button moveTask">
        &#187;
      </button>
    </div>
  )
}
```

We have a couple of interesting things happening here. We have two buttons which we will use to call the moveTask function and switch the task's status.

We also have a form with input fields for task's title and description. There is also the urgencyLabels container which is a group of radio buttons for switching the task's status. Getting the checked radio button's value is a bit tricky in react, so we will handle the urgency through state, but everything else we can submit as a form field.

I have set up some helper classes - "collapsed", "collapsedTask" and "selected". I wanted to collapse tasks when they get saved and loaded from storage, so the screen doesn't get too cluttered. This is handled with the isCollapsed property that each new task will have, and everything else is done through CSS. If a task has isCollapsed = true, my CSS takes care of collapsing everything except for the title, urgency and control buttons. We also reveal a delete button which you can use to get rid of a task completely.

We are also reusing the Save button to edit an already created task. Since we have two buttons in a form we need to handle our form's onSubmit event.

```jsx
function handleSubmit(event) {
  event.preventDefault()

  if (formAction === "save") {
    if (collapsed) {
      setCollapsed(false)
    } else {
      let newTask = {
        id: task.id,
        title: event.target.elements.title.value,
        description: event.target.elements.description.value,
        urgency: urgencyLevel,
        status: task.status,
        isCollapsed: true,
      }

      addTask(newTask)
      setCollapsed(true)
    }
  }

  if (formAction === "delete") {
    deleteTask(task.id)
  }
}
```

If our form action is set to save that means we are trying to either save a task or edit it. If we are trying to edit it we don't want to actually submit a form - we just want to "uncollapse" it. If we are saving a task then we create a new object with the properties from the form and from the state. If we are trying to delete the task we just call our deleteTask function while passing in the task's ID.

To be able to move a task between status lanes I made two functions which are very similar in what they do, but this makes the code more readable.

```jsx
function handleMoveLeft() {
  let newStatus = ""

  if (task.status === "In Progress") {
    newStatus = "Backlog"
  } else if (task.status === "Done") {
    newStatus = "In Progress"
  }

  if (newStatus !== "") {
    moveTask(task.id, newStatus)
  }
}

function handleMoveRight() {
  let newStatus = ""

  if (task.status === "Backlog") {
    newStatus = "In Progress"
  } else if (task.status === "In Progress") {
    newStatus = "Done"
  }

  if (newStatus !== "") {
    moveTask(task.id, newStatus)
  }
}
```

Both functions look at the task's current status and set the new status based on what we are trying to do. Backlog is our left-most status so clicking the moveLeft button while the task is in the Backlog won't do anything. Similar is true for the Done status and clicking the moveRight button.

And that is all of the code I've used for this project, except for the CSS. If you are interested into seeing the full working version you can check out <a href="https://codesandbox.io/s/task-management-app-o5hcn" target="_blank" rel="noopener noreferrer">the project on CodeSandbox</a>.

<hr>

<div class="sectionHighlight">If you have any questions or comments you can reach out to me on <a href="https://twitter.com/alekswritescode" target="_blank" rel="noopener noreferrer">Twitter</a> and <a href="https://www.instagram.com/aleks.popovic/" target="_blank" rel="noopener noreferrer">Instagram</a>, where I also post interesting code tidbits and designs.

I also have a <a href="https://www.youtube.com/AleksPopovic" target="_blank" rel="noopener noreferrer">YouTube channel</a> where I regularly upload React and web dev tutorials, so if that's your cup of tea feel free to support me by subscribing.</div>
