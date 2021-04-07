import React from "react";
import FaCode from "react-icons/lib/fa/code";
import FaFutbolO from "react-icons/lib/fa/futbol-o";
import FaHeart from "react-icons/lib/fa/heart";

import { Link } from "react-router-dom";

const Intro = () => {
  return (
    <div className="introduction">
      <h3>I am</h3>
      <p>宇扬, Uyarn</p>
      <p>Front-End Developer</p>
      <h4 style={{ color: "#337ab7" }}>喜欢</h4>
      <p>
        <FaCode /> 写点前端
      </p>
      <p>
        <FaFutbolO /> 踢球, 利物浦
      </p>
      <FaHeart />
      <span>
        <Link to="./anniversary"> 凯蒂林</Link>{" "}
      </span>
    </div>
  );
};

export default Intro;
