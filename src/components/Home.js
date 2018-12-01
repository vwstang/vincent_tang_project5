import React, { Component } from "react";

/* Import Components */
import Header from "./Header";
import Footer from "./Footer";

// import logo from './logo.svg';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      breadcrumbs: [
        "top",
        "home",
        ["blogs", "obidos", "porto", "lisbon"],
        "about",
        "contact"
      ]
    };
  }

  render() {
    return (
      <div className="page">
        <Header title="Home" breadcrumbs={["top", "home", "blogs"]} />
        <main className="welcome wrapper">
          <p>Hi there, thanks for stopping by!</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas earum et mollitia voluptate consequuntur magni voluptatum velit porro libero rerum. A alias officia numquam facere distinctio unde porro atque cum eos, quas culpa sit earum, natus, et ex nisi at! Accusantium rerum ut nam, repudiandae tenetur eos pariatur impedit necessitatibus veniam, suscipit enim dignissimos ea at inventore consequatur doloremque fugit et accusamus minus beatae placeat officia dolor. Soluta consequatur libero laborum cum provident sunt reiciendis itaque maxime quos, hic voluptatibus quo quasi obcaecati vel magnam ut nihil sapiente vitae? Provident quia fuga harum unde totam aliquid possimus eius fugiat reiciendis quibusdam aliquam, quaerat nemo explicabo deleniti sapiente numquam, iusto ad adipisci cum laborum dolore, esse vitae molestiae. Totam culpa libero ducimus, debitis, minus quas sed voluptatibus earum quibusdam reiciendis, explicabo numquam. Unde libero, animi quam dolorum error in hic, laborum facere incidunt quod numquam odio sapiente nesciunt at maxime voluptates.</p>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Home;
