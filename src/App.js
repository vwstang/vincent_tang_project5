import React, { Component } from "react";

/* Import Components */
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";

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
        <Header />
        <Home />
        <Footer />
      </div>
    );
  }
}

export default App;
