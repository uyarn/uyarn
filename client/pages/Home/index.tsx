import React, { useRef } from "react";
import Logo from "./Components/Logo";
import Tags from "./Components/Tags";
import useFireWork from "react-use-firework";

import "./index.scss";

const TATOO = '{<宇扬 className="Front-end" />}';

export default function Home() {
  const ref = useRef(null);
  useFireWork(ref);
  return (
    <div className="home" ref={ref}>
      <Logo />
      <p>{TATOO}</p>
      <Tags />
    </div>
  );
}
