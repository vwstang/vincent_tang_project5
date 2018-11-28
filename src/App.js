import React, { Component } from "react";

/* Import Components */
import HeroBanner from "./components/Header";

// import logo from './logo.svg';
import "./App.scss";



class App extends Component {
  constructor() {
    super();
    this.state = {
      
    };
  }

  render() {
    return (
      <div className="App">
        <HeroBanner />
        <Home />
      </div>
    );
  }
}

export default App;
