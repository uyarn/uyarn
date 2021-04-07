import React from "react";
import { TagCloud } from "react-tagcloud";

import "./index.scss";

const data = [
  { value: "JavaScript💻", count: 25 },
  { value: "React", count: 15 },
  { value: "旅行", count: 15 },
  { value: "利物浦", count: 22 },
  { value: "足球⚽️", count: 22 },
];
export default function Tags(){
  
  return (
    <TagCloud
      minSize={15}
      maxSize={20}
      tags={data}
      onClick={() =>location.href = "./#/aboutme"}
    />
  );
};

