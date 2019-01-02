import React, { Component } from "react";

/* Import Components */
import Header from "./Header";
import Footer from "./Footer";


class Home extends Component {
  render() {
    return (
      <div className="page">
        <Header title="Home" banner="home" breadcrumbs={["top", "home", "blogs"]} />
        <main className="welcome wrapper">
          <p>Hi there, thanks for stopping by!</p>
          <p>Welcome to YiBuRo Blog, a <em>featherweight</em> blogging platform where you can create new blogs, edit its content, publish or unpublish specific blogs, view the blogs, as well as delete them.</p>
          <p>Check out the Blogs pages to view your blogs, and edit them using the edit button.</p>
          <p>Thanks and enjoy!</p>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Home;
