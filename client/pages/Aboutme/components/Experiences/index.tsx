import React, { useState } from "react";
import PieChart from "recharts/es6/chart/PieChart";
import Pie from "recharts/es6/polar/Pie";

import experCircle from "./circle";

import { RESUME as data } from "@/consts";

import "./index.scss";

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(3);

  return (
    <div className="experience">
      <PieChart width={300} height={200}>
        <Pie
          activeIndex={activeIndex}
          activeShape={experCircle}
          data={data}
          cx={150}
          cy={100}
          innerRadius={50}
          outerRadius={60}
          onClick={(_val, idx: number) => setActiveIndex(idx)}
        />
      </PieChart>
      <p>
        {data?.[activeIndex]?.type === "edu" ? "👨‍🎓" : "👨‍💻"}
        {data?.[activeIndex]?.detail}
      </p>
      <p>📍 {data?.[activeIndex]?.location}</p>
    </div>
  );
}
