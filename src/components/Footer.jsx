import React, { useState } from "react";
import { changeTheme } from "../utils/helpers/helpers";
import { AnimatePresence, motion } from "framer-motion";
import { MdStyle } from "react-icons/md";
import { FaCode, FaGithubAlt, FaLinkedinIn } from "react-icons/fa";

const ThemeOption = ({ theme, handleClick }) => {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  return (
    <motion.div
      variants={item}
      onClick={handleClick}
      className=" bg-bgSecondary px-4 py-1 my-1 rounded-lg cursor-pointer"
    >
      {theme}
    </motion.div>
  );
};
const Footer = () => {
  
  const [show, setShow] = useState(false);
  const [hover, setHover] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("default");

  const themes = [
    { name: "default", id: "" },
    { name: "blue night", id: "theme2" },
    { name: "superuser", id: "theme3" },
    { name: "lavender", id: "theme4" },
  ];

  const handleThemeChange = (id, name) => {
    changeTheme(id);
    setSelectedTheme(name);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, staggerDirection: -1 },
    },
    exit: { opacity: 0 },
  };

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 60,
  };

  return (
    <div className="flex gap-6 py-4 text-textSecondary items-center justify-between">
      <div className="flex items-center gap-4 text-xl">
        <a href="https://github.com/mozix5" target="_blank">
          <FaGithubAlt className=" cursor-pointer hover:text-hoverText" />
        </a>
        <a
          href="https://www.linkedin.com/in/mosin-md-86569a202/"
          target="_blank"
        >
          <FaLinkedinIn className=" cursor-pointer hover:text-hoverText" />
        </a>
        <a href="https://github.com/mozix5" target="_blank">
          <FaCode className=" cursor-pointer hover:text-hoverText" />
        </a>
      </div>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ fontFamily: "Mixiwa" }}
        className={` text-xl text-caret cursor-pointer flex gap-2 ${
          hover ? "justify-between flex-1 " : "justify-center"
        }`}
      >
        <motion.span layout transition={spring}>
          &#60;/
        </motion.span>
        <a href="https://recap-after-use.vercel.app/" target="_blank">
          <span>mozix</span>
        </a>
        <motion.span layout transition={spring}>
          &#62;
        </motion.span>
      </div>
      <div onClick={() => setShow(!show)} className="relative">
        <AnimatePresence>
          {show && (
            <motion.div
              className=" absolute bottom-8 text-sm w-max"
              variants={container}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {themes.map((t) => (
                <ThemeOption
                  key={t.name}
                  theme={t.name}
                  handleClick={() => handleThemeChange(t.id, t.name)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <div className=" cursor-pointer flex items-center gap-2 hover:text-hoverText min-w-[100px] justify-end">
          <MdStyle className=" text-xl" />
          <div className=" text-sm whitespace-nowrap">{selectedTheme}</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
