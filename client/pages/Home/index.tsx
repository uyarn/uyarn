import React from "react";
import Logo from "./Components/Logo";
import Tags from "./Components/Tags";

import "./index.scss";

const TATOO = '{<宇扬 className="Front-end" />}';

export default function Home() {
  return (
    <div className="home">
      <Logo />
      <p>{TATOO}</p>
      <Tags />
    </div>
  );
}
