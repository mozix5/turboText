import React from "react";
import { changeTheme } from "../utils/helpers/helpers";

const Footer = () => {
  return (
    <div className="flex gap-6 py-8">
      <div style={{ fontFamily: "Mixiwa" }} className=" text-xl text-caret">&#60;/ mozix &#62;</div>
      Footer
      <button onClick={() => changeTheme("")}>theme1</button>
      <button onClick={() => changeTheme("theme2")}>theme2</button>
      <button onClick={() => changeTheme("theme3")}>theme3</button>
      <button onClick={() => changeTheme("theme4")}>theme3</button>
    </div>
  );
};

export default Footer;
