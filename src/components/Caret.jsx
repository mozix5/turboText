import React from "react";
import { motion } from "framer-motion";
const Caret = ({ repeatValue }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 0, 1] }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="w-[2px] h-[1.2em] bg-caret self-center ml-0.5"
    ></motion.div>
  );
};

export default Caret;
