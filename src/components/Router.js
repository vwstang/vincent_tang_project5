import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Blogs from "./Blogs";
import NotFound from "./NotFound";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/blogs" component={Blogs} />
        {/* <Route path="/blogs/editor/:postID" component={Editor} />
        <Route path="/blogs/post/:postID" component={Post} /> */}
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router;
