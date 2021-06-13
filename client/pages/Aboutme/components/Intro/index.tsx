import React from "react";
import FaCode from "react-icons/lib/fa/code";
import FaGithub from "react-icons/lib/fa/github";
import { Link } from "react-router-dom";

import Experience from "../Experiences";

const Intro = () => {
  return (
    <div className="introduction">
      {/* profile */}
      <h3>Profile 🐑</h3>
      <p>宇扬, Uyarn</p>
      <p>Chinese 🇨🇳</p>
      <p>Web Developer 👨‍💻</p>
      {/* tags */}
      <h3>Tags 🏷 </h3>
      <p>
        <FaCode />
        <span>React, TypeScript, GraphQL</span>
      </p>
      <p>⚽️ Football, Support Liverpool FC</p>
      <p>🐈 Feed a cat </p>
      <p>
        ❤<Link to="./anniversary"> Kitty Lin</Link>{" "}
      </p>
      <h3>Experiences 🌏</h3>
      {/* Experience */}
      <Experience />
      <h3>Contact</h3>
      <a href="https://github.com/uyarn" target="_blank">
        <FaGithub size={50} />
      </a>
    </div>
  );
};

export default Intro;
