import React, { Component } from "react";
import firebase from "../data/firebase";
// Components
import Header from "./Header";
import Footer from "./Footer";


const dbRefBlogs = firebase.database().ref("/blogs");


class BlogCards extends Component {
  render() {
    return (
      <li className="blog-card">
        <a href={`/post/${this.props.postID}`}>
          {this.props.postTitle}
        </a>
      </li>
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

  navTo = e => {
    window.location.href = e.target.getAttribute("data-href");
  }

  componentDidMount() {
    dbRefBlogs.on("value", snapshot => {
      console.log(snapshot.val());
      this.setState({
        blogDB: snapshot.val()
      });
    });
  }

  render() {
    return (
      <div className="page">
        <Header
          title="Blogs"
          banner="blogs"
          breadcrumbs={["top", "home", "blogs"]}
        />
        <main className="wrapper">
          <button
            id="btn-new"
            type="button"
            className="btn"
            data-href="/editblogs"
            onClick={this.navTo}
          >Edit Blogs</button>
          <div className="card-container">
            <ul className="blog-cards">
              {
                Object.entries(this.state.blogDB)
                  .filter(post => {
                    return post[1].published === true
                  })
                  .map(post => {
                  return (
                    <BlogCards
                      key={post[0]}
                      postID={post[0]}
                      postTitle={post[1].title}
                    />
                  )
                })
              }
            </ul>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}

export default Blogs;
