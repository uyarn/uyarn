import React from "react";

import { Link } from "react-router-dom";
import map from "lodash/map";

import "./index.scss";

function List({ list }: { list: Array<any> }) {
  return (
    <div className="blog-list">
      {map(list, ({ node: { id, title, number, createdAt, labels } }) => (
        <div className="li" key={id}>
          {createdAt ? (
            <span className="li-create-time">{createdAt.split("T")[0]}</span>
          ) : null}
          <Link to={`/blogs/${number}`}>{title}</Link>
          <span className="li-label">
            {labels?.nodes?.map?.((label) => (
              <span style={{ color: label?.color }}>{label?.name}</span>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}
export default List;
