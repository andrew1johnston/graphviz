# Graph Visualisation App

## Project description

A web UI demo to render a visualisation of a graph using React and d3.

## Running the app

To run the app you will need to follow the instructions in the order below.

### Installing the development dependencies

Before starting, you will need the following development environment dependencies:

#### 1. [node.js](https://nodejs.org)

- node.js is a JavaScript runtime
- to install it follow the instructions for your platform here https://nodejs.org/en/download/ - just pick the LTS version.

- You can check the installation is successful by running the following:

```
node --version
```

#### 2. git client

- e.g. [Git for Windows](https://gitforwindows.org) if you have a Windows machine. Follow the link for instructions on how to download and install.
- or the XCode Command Line developer tools should include git if you are on a Mac. Running `git` in a Terminal window should prompt you to download these.

You may have to reboot after installing these tools.

### Getting the code

Again, from a command window run the following to pull the code onto your machine:

```
git clone https://github.com/andrew1johnston/graphviz.git
```

### Installing the project dependencies

The project is dependent on the following 3rd party libraries

1. [React](https://reactjs.org)

- library for creating interactive UIs

2. [Create React App](https://create-react-app.dev)

- framework for developing React applications

3. [d3](https://d3js.org)

- library for drawing the graph itself

4. [Fontawesome](https://fontawesome.com)

- a library of icons

5. [Storybook](https://storybook.js.org)

- a tool to develop React components

To install all the required dependencies, run the following:

```
cd app
npm install
```

### Building & running the app

`npm start`

This should open a web browser and automatically navigate to the appropriate page.
