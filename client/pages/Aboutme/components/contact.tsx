import React from "react";
import FaWechat from "react-icons/lib/fa/wechat";
import FaGithub from "react-icons/lib/fa/github";

const Contact = ({ closeQr }) => {
  return (
    <div>
      <h3>Contact Me</h3>
      <a href="https://github.com/uyarn" target="_blank">
        <FaGithub size={50} />
      </a>
      <FaWechat onClick={closeQr} size={50} />
    </div>
  );
};

export default Contact;
