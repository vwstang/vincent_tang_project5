import React, { Component } from "react";
import firebase from "../data/firebase";

// Components
import Header from "./Header";
import Footer from "./Footer";

let db = firebase.database();

class Editor extends Component {
  constructor() {
    super();
    this.state = {
      currTitle: "",
      currDraft: []
    };
  }

  updateDraft = e => {
    this.setState({
      [e.target.id]: e.target.value.split("\n")
    })
  }

  handleSubmit = e => {
    e.preventDefault();

    db.ref(`/blogs/${this.props.match.params.postID}/draft`).set(this.state.currDraft);
  }

  componentDidMount() {
    db.ref("/blogs").on("value", snapshot => {
      const blogDB = snapshot.val();
      this.setState({
        currTitle: blogDB[this.props.match.params.postID].title,
        currDraft: blogDB[this.props.match.params.postID].draft
      })
    });
  }

  render() {
    return (
      <div className="page">
        <Header title={this.state.currTitle} breadcrumbs={["top", "home", "blogs"]} />
        <div className="editor wrapper">
          <form onSubmit={this.handleSubmit} action="">
            <textarea
              id="currDraft"
              className="draft-editor"
              placeholder="What was I up to..."
              value={this.state.currDraft.join("\n")}
              onChange={this.updateDraft}
            ></textarea>
            <button
              className="btn-save"
              type="submit"
            >Save Draft</button>
          </form>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Editor;
