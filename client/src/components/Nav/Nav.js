import React from "react";
import "./Nav.css";

const Nav = () => (
  <nav className="navbar navbar-inverse navbar-top">
    <div className="container-fluid">
        <div><h1>
          NYT Book Club</h1></div>
          <div className="links">
          <a href="/">
          Search for Books</a>
          <a href="/books">
          See Saved Books</a>
          </div>

    </div>
  </nav>
);

export default Nav;
