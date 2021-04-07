import React from "react";
import { Route } from "react-router-dom";
import routes from "../router";
import { Header } from "../components";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

class AppComponent extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };
  }
  toggleDrop = () => {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  };

  shouldComponentUpdate() {
    return true;
  }
  render() {
    return (
      <div className="yarn-root">
        <Header
          dropdownOpen={this.state.dropdownOpen}
          toggleDrop={this.toggleDrop}
        />
        <div className="yarn-page">
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </div>
        <footer>
          <p>Author @Uyarn</p>
        </footer>
      </div>
    );
  }
}

export default AppComponent;
