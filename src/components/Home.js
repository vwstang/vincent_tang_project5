import React, { Component } from "react";

/* Import Components */
import Header from "./Header";
import Footer from "./Footer";

// import logo from './logo.svg';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      breadcrumbs: [
        "top",
        "home",
        ["blogs", "obidos", "porto", "lisbon"],
        "about",
        "contact"
      ]
    };
  }

  render() {
    return (
      <div className="App">
        <Header breadcrumbs={this.state.breadcrumbs} />
        <a href="blogs">Blogs</a>
        {/* Recent Blog Posts */}
        {/* Categories */}
        {/* <Editor draft="test" /> */}
        <Footer />
      </div>
    );
  }
}

export default Home;
