import React from "react";

import "./index.scss";

const Wechat = ({ display, closeQr }) => {
  const style = { display: display ? "block" : "none" };
  return (
    <div onClick={closeQr} style={style} className="wechat">
      <img src={require("@/statics/qr.jpg")} />
    </div>
  );
};

export default Wechat;
