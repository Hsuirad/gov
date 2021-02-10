import React from "react";
import { elastic as Menu } from "react-burger-menu";

// eslint-disable-next-line import/no-anonymous-default-export
export default props => {
  return (
    <Menu {...props}>
      <a className="menu-item" href="/">
        Home
      </a>

      <a className="menu-item" href="/about">
        About
      </a>

      <a className="menu-item" href="/services">
        Services
      </a>

      <a className="menu-item" href="/contact">
        Contact us
      </a>
    </Menu>
  );
};