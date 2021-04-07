import React from "react";

import Contact from "./components/contact";
import Wechat from "./components/wechat";
import Intro from "./components/intro";
import Experience from "./components/experience";

import "./index.scss";

interface IAboutMeProps {
  match: any;
}
interface IAboutMeState {
  wechat: boolean;
}
class AboutMe extends React.Component<IAboutMeProps, IAboutMeState> {
  constructor(props) {
    super(props);
    this.state = {
      wechat: false,
    };
  }
  closeQr = () => {
    this.setState((prevState) => ({ wechat: !prevState.wechat }));
  };

  render() {
    return (
      <div className="aboutme">
        <Intro />
        <Experience />
        <div className="contact">
          <Contact closeQr={this.closeQr} />
          <Wechat display={this.state.wechat} closeQr={this.closeQr} />
        </div>
      </div>
    );
  }
}
export default AboutMe;
