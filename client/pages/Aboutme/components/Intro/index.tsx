import React from "react";
import FaCode from "react-icons/lib/fa/code";
import FaGithub from "react-icons/lib/fa/github";
import FaWechat from "react-icons/lib/fa/wechat";

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
      <p>Currently Working at @Tencent CDC</p>
      {/* tags */}
      <h3>Tags 🏷 </h3>
      <p>
        <FaCode />
        <span>Prefer React, TypeScript, GraphQL</span>
      </p>
      <p>⚽️ Football, Support Liverpool FC</p>
      <p>🐈 Raising a cat </p>
      <p>
        ❤<Link to="./anniversary"> Kitty Lin</Link>{" "}
      </p>
      <h3>Experiences 🌏</h3>
      {/* Experience */}
      <Experience />
      <h3>Contact 🔦</h3>
      <p>
        <FaGithub size={20} />
        https://github.com/uyarn
      </p>
      <p>
        <FaWechat size={20} />
        useUyarn
      </p>
    </div>
  );
};

export default Intro;
