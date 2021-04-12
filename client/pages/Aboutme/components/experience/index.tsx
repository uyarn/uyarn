import React, { useState } from "react";
import PieChart from "recharts/es6/chart/PieChart";
import Pie from "recharts/es6/polar/Pie";

import experCircle from "./circle";

import { RESUME as data } from "@/consts";

import "./index.scss";

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <div className="experience">
      <h3>Experience</h3>
      <PieChart width={300} height={200}>
        <Pie
          activeIndex={activeIndex}
          activeShape={experCircle}
          data={data}
          cx={150}
          cy={100}
          innerRadius={50}
          outerRadius={60}
          onClick={(val, idx) => setActiveIndex(idx)}
        />
      </PieChart>
      <p>{data[activeIndex].detail}</p>
    </div>
  );
}
