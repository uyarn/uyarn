import React from "react";
import { Link } from "react-router-dom";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";

import "./index.scss";

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
              <DropdownMenu>
                <ul>
                  <li>
                    <Link to="/">home</Link>
                  </li>
                  <li>
                    <Link to="/aboutme">about</Link>
                  </li>
                  {/* <li>
                    <Link to="/gadgets">gadgets</Link>
                  </li> */}
                  {/* <li>
                    <Link to="/blogs">blog</Link>
                  </li> */}
                </ul>
              </DropdownMenu>
            </Dropdown>
            <a className="navbar-brand" href="#">
              Yuyang Chen
            </a>
          </div>
          {/* 响应PC端*/}
          <div className="collapse navbar-collapse pc">
            <ul className="nav navbar-nav">
              <li>
                <Link to="/">home</Link>
              </li>
              <li>
                <Link to="/aboutme">about</Link>
              </li>
              {/* <li>
                <Link to="/gadgets">gadgets</Link>
              </li> */}
              {/* <li>
                <Link to="/blogs">blog</Link>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
