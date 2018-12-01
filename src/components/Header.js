import React, { Component } from "react";
import Nav from "./Navigation";

class Header extends Component {
  render() {
    return (
      <header className="hero-banner">
        <Nav breadcrumbs={this.props.breadcrumbs} />
        <div className="banner-image">
          <div className="title-container wrapper">
            <h1 className="title">{this.props.title}</h1>
          </div>
        </div>
      </header>
    )
  }
}

export default Header;