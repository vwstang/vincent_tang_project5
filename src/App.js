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
      breadcrumbs: ["Top","Home",["Blogs","Obidos","Porto","Lisbon"],"About","Contact"]
    };
  }

  render() {
    return (
      <div className="App">
        <Header breadcrumbs={this.state.breadcrumbs} />
        <Home />
        <Footer />
      </div>
    );
  }
}

export default App;
