import React from "react";
import { motion } from "framer-motion";
const Caret = ({ repeatValue }) => {
  return (
    <motion.div
      layout
      transition={{
        duration: 0.1,
      }}
      className=" w-[2px] leading-relaxed h-8 bg-caret"
    ></motion.div>
  );
};

export default Caret;
