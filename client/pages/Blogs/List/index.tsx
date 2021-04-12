import React from "react";

import { Link } from "react-router-dom";
import map from "lodash/map";

import "./index.scss";

function List({ list }: { list: Array<any> }) {
  return (
    <div className="blog-list">
      {map(list, ({ node: { id, title, number } }) => (
        <div className="li" key={id}>
          <Link to={"/article/" + number}>{title}</Link>
        </div>
      ))}
    </div>
  );
}
export default List;
