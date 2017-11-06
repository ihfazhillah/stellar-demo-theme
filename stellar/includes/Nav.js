import React from "react";
import { Link } from "react-router";
import EventListener from "react-event-listener";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnScroll = this.handleOnScroll.bind(this);
  }

  handleOnScroll(e) {
    let navControl, footer;
    navControl = document.getElementById("navControl");
    footer = document.getElementById("footer");

    let rect = navControl && navControl.getBoundingClientRect();

    let footerRect = footer && footer.getBoundingClientRect();

    if (rect.top <= window.pageXOffset) {
      this.nav && this.nav.classList.add("alt");
    } else {
      this.nav && this.nav.classList.remove("alt");
    }

    if (footerRect.top + rect.height <= window.pageXOffset) {
      this.nav && this.nav.classList.remove("alt");
    }
  }

  render() {
    let theMenu = this.props.theMenu();
    return (
      <div>
        <EventListener target="window" onScroll={this.handleOnScroll} />
        <div id="navControl" />
        <nav id="nav" ref={nav => (this.nav = nav)}>
          {theMenu.props.menuItems.length ? (
            <ul className="icons" style={{ position: "absolute" }}>
              <li>
                <Link to="/" className="icon fa-home">
                  {" "}
                  Home
                </Link>
              </li>
            </ul>
          ) : null}
          {theMenu}
        </nav>
      </div>
    );
  }
}

export default Nav;
