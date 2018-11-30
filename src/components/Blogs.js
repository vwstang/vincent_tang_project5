import React, { Component } from "react";
import firebase from "../data/firebase";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
// Components
import Header from "./Header";
import Footer from "./Footer";

// Font Awesome
library.add(faPrint, faEdit, faTrashAlt);

const dbRefBlogs = firebase.database().ref("/blogs");

class BlogList extends Component {
  openEditor = e => window.location.href = `/editor/${e.target.id}`;

  render() {
    return (
      <main className="wrapper">
        <ul className="list-header">
          <li className="list-header__item">Title</li>
          <li className="list-header__item">Snippet</li>
          <li className="list-header__item">Status</li>
          <li className="list-header__item list-header__item--button">Publish</li>
          <li className="list-header__item list-header__item--button">Edit</li>
          <li className="list-header__item list-header__item--button">Delete</li>
        </ul>
        <ul className="blog-list">
          {
            this.props.blogDB ?
              Object.entries(this.props.blogDB).map(post => {
                return (
                  <li key={post[0]} className="blog-list__item">
                    <span className="blog-list__item__info">
                      {post[1].title}
                    </span>
                    <span className="blog-list__item__info blog-list__item__info--snippet">
                      {post[1].draft.join(" ").slice(0, 100)}
                    </span>
                    <span className="blog-list__item__info">
                      {post[1].published ? "Published" : "Draft"}
                    </span>
                    <span className="blog-list__item__info blog-list__item__info--button">
                      <button
                        id={post[0]}
                        className="blog-list__item__link"
                        onClick={this.props.updateStatus}
                      >
                        <FontAwesomeIcon icon="print" />
                      </button>
                    </span>
                    <span className="blog-list__item__info blog-list__item__info--button">
                      <button
                        id={post[0]}
                        className="blog-list__item__link"
                        onClick={this.openEditor}
                      >
                        <FontAwesomeIcon icon="edit" />
                      </button>
                    </span>
                    <span className="blog-list__item__info blog-list__item__info--button">
                      <button
                        id={post[0]}
                        className="blog-list__item__link"
                        onClick={this.props.deletePost}
                      >
                        <FontAwesomeIcon icon="trash-alt" />
                      </button>
                    </span>
                  </li>  
                )
              }) :
              console.log("No blogs exist")
            }
        </ul>
      </main>
    )
  }
}

class Blogs extends Component {
  constructor() {
    super();
    this.state = {
      blogDB: {}
    }
  }

  createNew = () => {
    let postIDMax = 0;
    const initPost = {
      title: "New Blog Post",
      published: false,
      draft: [""]
    }

    dbRefBlogs.once("value").then(snapshot => {
      const snapValue = snapshot.val();
      if (snapValue) {
        const postsList = Object.keys(snapshot.val());
        postIDMax = Math.max(...postsList.map(postID => {
          return parseInt(postID.slice(4));
        }));
        dbRefBlogs.child(`post${postIDMax + 1}`).set(initPost);
      } else {
        dbRefBlogs.child("post1").set(initPost);
      }
    });
  }

  updateStatus = e => {
    const post = this.state.blogDB[e.target.id];
    const dbPostPublished = dbRefBlogs.child(`${e.target.id}/published`);
    const confirmMsg = post.published ? "unpublish" : "publish";
    if (window.confirm(`Are you sure you would like to ${confirmMsg} the post "${post.title}"?`)) {
      post.published ? dbPostPublished.set(false) : dbPostPublished.set(true);
      alert(`"${post.title}" was ${confirmMsg}ed successfully.`);
    } else {
      alert(`"${post.title}" was not ${confirmMsg}ed.`);
    }
  }

  deletePost = e => {
    console.log(e.target);
    
  }
  
  componentDidMount() {
    dbRefBlogs.on("value", snapshot => {
      this.setState({
        blogDB: snapshot.val()
      })
    });
  }

  render() {
    return (
      <div className="page">
        <Header
          title={"Blogs"}
          breadcrumbs={["top", "home", "blogs"]}
        />
        <BlogList
          blogDB={this.state.blogDB}
          updateStatus={this.updateStatus}
          deletePost={this.deletePost}
        />
        <button
          id="btn-new"
          type="button"
          onClick={this.createNew}
        >New</button>
        <Footer />
      </div>
    )
  }
}

export default Blogs;
