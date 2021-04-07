import React from "react";

import "./index.scss";

export default function Logo() {
  return (
    <div className="logo">
      <img src={require("@/statics/uyarn.png")} alt="uyarn" />
      <div></div>
    </div>
  );
}
