import React, { Component } from "react";
import firebase from "../data/firebase";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
// Components
import Header from "./Header";
import Editor from "./EZEditor";
import Footer from "./Footer";

// Font Awesome
library.add(faPrint, faEdit, faTrashAlt);

const dbRefBlogs = firebase.database().ref("/blogs");

class BlogList extends Component {
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
            Object.entries(this.props.blogDB).map(post => {
              console.log(post);
              return (
                <li className="blog-list__item">
                  <span className="blog-list__item__info">
                    {post[1].title}
                  </span>
                  <span className="blog-list__item__info blog-list__item__info--snippet">
                    {post[1].draft.join(" ").slice(0, 50)}
                  </span>
                  <span className="blog-list__item__info">
                    {post[1].published ? "Published" : "Draft"}
                  </span>
                  <span className="blog-list__item__info blog-list__item__info--button">
                    <a
                      className="blog-list__item__link"
                      href="#"
                    ><FontAwesomeIcon icon="print" /></a>
                  </span>
                  <span className="blog-list__item__info blog-list__item__info--button">
                    <a
                      className="blog-list__item__link"
                      href={`../editor/${post[0]}`}
                    ><FontAwesomeIcon icon="edit" /></a>
                  </span>
                  <span className="blog-list__item__info blog-list__item__info--button">
                    <a
                      className="blog-list__item__link"
                      href="#"
                      onClick={() => alert("You sure you want to delete this post?")}
                    ><FontAwesomeIcon icon="trash-alt" /></a>
                  </span>
                </li>
              )
            })
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

  handleClick = e => {
    // console.log(e.target.value);
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
        <Header breadcrumbs={["top", "home", "blogs"]} />
        <BlogList blogDB={this.state.blogDB} />
        {/* <form>
          <button
            id="new"
            type="button"
            onClick={this.handleClick}
          >New</button>
          <button
            id="edit"
            type="button"
            onClick={this.handleClick}
          >Edit</button>
          <button
            id="delete"
            type="button"
            onClick={this.handleClick}
          >Delete</button>
        </form> */}
        <Footer />
      </div>
    )
  }
}

export default Blogs;
