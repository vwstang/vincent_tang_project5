import React, { Component } from "react";

class Crumbs extends Component {
  render() {
    return (
      <ul className={this.props.menulevel}>
        {
          this.props.breadcrumbs.slice(1).map(crumb => {
            console.log(crumb, typeof crumb);
            if (typeof crumb === "object") {
              return (
                <li>
                  {crumb[0]}
                  <Crumbs breadcrumbs={crumb} menulevel="sub-menu" />
                </li>
              )
            } else {
              return <li>{crumb}</li>
            }
          })
        }
      </ul>
    ) 
  }
}

class Nav extends Component {
  render() {
    return (
      <nav className="navigation">
        <Crumbs breadcrumbs={this.props.breadcrumbs} menulevel="top-menu" />
      </nav>
    )
  }
}

export default Nav;