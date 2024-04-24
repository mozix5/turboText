import React from "react";
import Icon from "./Icon";

const Navbar = () => {
  return (
    <div className="py-6">
      <div className=" flex  items-center text-white gap-2 cursor-pointer">
        <div className=" ">
          <Icon />
        </div>
        <div className=" text-3xl font-semibold tracking-tight">turboText</div>
      </div>
      {/* <Icon /> */}
    </div>
  );
};

export default Navbar;
