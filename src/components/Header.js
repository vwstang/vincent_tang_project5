import React, { Component } from "react";
import Nav from "./Navigation";

class Header extends Component {
  render() {
    return (
      <header className="hero-banner">
        <Nav breadcrumbs={this.props.breadcrumbs} />
        <div className="banner-image">
          <h1 className="title">My Blog</h1>
        </div>
      </header>
    )
  }
}

export default Header;