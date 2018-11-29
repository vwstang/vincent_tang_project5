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
  drawList = listOfPosts => {
    return Object.entries(listOfPosts).map(post => {
      return (
        <li className="blog-list__item">
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
            <a
              className="blog-list__item__link"
              href="#"
            ><FontAwesomeIcon icon="print" /></a>
          </span>
          <span className="blog-list__item__info blog-list__item__info--button">
            <a
              className="blog-list__item__link"
              href={`/editor/${post[0]}`}
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
          {this.props.blogDB ? this.drawList(this.props.blogDB) : console.log("No blogs exist")}
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
        console.log("Truthy");
      } else {
        dbRefBlogs.child("post1").set(initPost);
      }
      this.setState({
        blogDB: snapValue
      })
    });


    // dbRefBlogs.on("value", snapshot => {
    //   console.log("Snapshot");
    //   console.log(snapshot.val());
    //   if (snapshot.val() !== null) {
    //     console.log("IT'S NOT EMPTY FAM I SWEAR")
    //     const postsList = Object.keys(snapshot.val());
    //     postIDMax = Math.max(...postsList.map(postID => {
    //       return parseInt(postID.slice(4));
    //     }));
    //     console.log(postIDMax);
    //     dbRefBlogs.child(`post${postIDMax + 1}`).set(initPost);
    //   } else {
    //     dbRefBlogs.child("post1").set(initPost);
    //   }
      // if (snapshot.val()) {
      //   const postsList = Object.keys(snapshot.val());
      //   postIDMax = Math.max(...postsList.map(postID => {
      //     return parseInt(postID.slice(4));
      //   }));
      //   dbRefBlogs.child(`post${postIDMax + 1}`).set(initPost);
      // } else {
      //   dbRefBlogs.child("post1").set(initPost);
      // }
    // });
    // dbRefBlogs.on("value", snapshot => {
    //   console.log("I created");
    //   this.setState({
    //     blogDB: snapshot.val()
    //   })
    //   console.log("UPDATE THE STATE DAMNIT")
    //   console.log(this.state.blogDB);
    // });
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
        <Header title={"Blogs"} breadcrumbs={["top", "home", "blogs"]} />
        <BlogList blogDB={this.state.blogDB} />
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
