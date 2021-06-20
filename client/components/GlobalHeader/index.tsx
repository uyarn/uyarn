import React from "react";
import { Link } from "react-router-dom";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";

import "./index.scss";

const menuList = () => (
  <ul className="nav navbar-nav">
    <li>
      <Link to="/">Hello👋</Link>
    </li>
    <li>
      <Link to="/aboutme">About🐑</Link>
    </li>
    <li>
      <Link to="/blogs">Blogs📃</Link>
    </li>
    <li>
      <Link to="/projects">Projects🏗</Link>
    </li>
  </ul>
);
const Header = ({ dropdownOpen, toggleDrop }) => {
  return (
    <div className="header">
      <nav className="navbar navbar-default" role="navigation">
        <div className="container-fluid">
          {/* 响应移动端 */}
          <div className="navbar-header mobile">
            <Dropdown isOpen={dropdownOpen} toggle={toggleDrop}>
              <DropdownToggle>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </DropdownToggle>
              <DropdownMenu>{menuList()}</DropdownMenu>
            </Dropdown>
            <a className="navbar-brand" href="#">
              🐑 Uyarn
            </a>
          </div>
          {/* 响应PC端*/}
          <div className="collapse navbar-collapse pc">{menuList()}</div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
