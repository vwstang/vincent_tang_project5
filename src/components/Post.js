import React, { Component } from "react";
import firebase from "../data/firebase";

// Components
import Header from "./Header";
import Footer from "./Footer";

let db = firebase.database();

class Post extends Component {
  constructor() {
    super();
    this.state = {
      currTitle: "",
      currDraft: []
    };
  }

  componentDidMount() {
    db.ref(`blogs/${this.props.match.params.postID}`).on("value", snapshot => {
      console.log(snapshot.val());
    });
  }

  render() {
    return (
      <div className="page">
        <Header title={this.state.currTitle} breadcrumbs={["top", "home", "blogs"]} />
        <main className="post wrapper">
          
        </main>
        <Footer />
      </div>
    )
  }
}

export default Post;
