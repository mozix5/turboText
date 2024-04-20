import React from "react";
import { motion } from "framer-motion";
const Caret = ({ repeatValue }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{
        repeat: repeatValue,
        duration: 1,
        ease: "easeInOut",
      }}
      className=" w-[2px] leading-relaxed h-8 bg-caret"
    ></motion.div>
  );
};

export default Caret;
