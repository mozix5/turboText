import React from "react";
import { motion } from "framer-motion";

const Result = ({ userChar, textToWrite, errors, accuracy, wpm }) => {
  return (
    <motion.div
      className="flex-1 text-caret flex items-center text-2xl justify-center gap-10"
      initial={{ y: 400 }}
      animate={{ y: 0 }}
    >
      {/* <div>Result </div> */}
      <div className=" flex gap-2">
        <div className=" text-textSecondary">acc:</div>
        <div className="font-bold">{accuracy.toFixed(0)}%</div>
      </div>
      <div className=" flex gap-2">
        <div className=" text-textSecondary">wpm: </div>
        <div className=" font-bold">{wpm}</div>
      </div>
      <div className=" flex gap-2">
        <div className=" text-textSecondary">char: </div>
        <div className=" font-bold">{userChar}</div>
      </div>
      <div className=" flex gap-2">
        <div className=" text-textSecondary">error: </div>
        <div className="text-error font-bold">{errors}</div>
      </div>
    </motion.div>
  );
};

export default Result;
