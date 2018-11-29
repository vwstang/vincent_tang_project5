import React, { Component } from "react";
import firebase from "../data/firebase";

const dbRefDrafts = firebase.database().ref("/drafts");

class Editor extends Component {
  constructor() {
    super();
    this.state = {
      postID: "",
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

    dbRefDrafts.push(this.state.currDraft);

  }

  componentDidMount() {
    // Should load the draft into the value of the textarea
    // this.setState({
    //   postID: this.
    // });
  }

  render() {
    return (
      <div className="editor wrapper">
        <form onSubmit={this.handleSubmit} action="">
          <textarea
            id="currDraft"
            className="draft-editor"
            placeholder="What was I up to..."
            onChange={this.updateDraft}
          ></textarea>
          <button type="submit">Save Draft</button>
        </form>
      </div>
    )
  }
}

export default Editor;