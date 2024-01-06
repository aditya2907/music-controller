import React, { Component } from "react";
import { render } from "react-dom";
import { createRoot } from 'react-dom/client';
import HomePage from "./HomePage";

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <HomePage />
            </div>
        )
    }
}

const appDiv = document.getElementById("app");
const root = createRoot(appDiv); // createRoot(container!) if you use TypeScript
root.render(<App />);


// // Before
// import { render } from 'react-dom';
// const container = document.getElementById('app');
// render(<App tab="home" />, container);

// // After
// import { createRoot } from 'react-dom/client';
// const container = document.getElementById('app');
// const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(<App tab="home" />);