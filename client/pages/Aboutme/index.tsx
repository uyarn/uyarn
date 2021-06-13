import React from "react";

import Intro from "./components/Intro";

import "./index.scss";

interface IAboutMeProps {
  match: any;
}
class AboutMe extends React.Component<IAboutMeProps> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="aboutme">
        <Intro />
      </div>
    );
  }
}

export default AboutMe;
