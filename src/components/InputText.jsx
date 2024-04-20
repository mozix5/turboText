import React from "react";
import Caret from "./Caret";
import { AnimatePresence, motion } from "framer-motion";

const InputText = ({ text, textToWrite }) => {
  const isEmpty = text.length === 0;
  textToWrite = textToWrite.split("");
  // console.log(textToWrite);
  return (
    <div className=" h-fit text-secondary absolute flex items-center flex-wrap inset-0 leading-relaxed">
      <AnimatePresence>
        {text.map((item, index) => {
          if (item === textToWrite[index]) {
            const char = item;
            return <Character char={char} />;
          } else {
            return (
              <Character key={index} char={textToWrite[index]} flag={true} />
            );
          }
        })}
        {}
        <Caret repeatValue={isEmpty ? Infinity : 0} />
      </AnimatePresence>
    </div>
  );
};
const Character = ({ char, flag }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.1 }}
      style={{ display: "inline-block" }}
      className={`${flag && "text-error"}`}
    >
      {char === " " ? (
        <span className={`${flag ? "text-error underline" : ""}`}>
          {"\u00A0"}
        </span>
      ) : (
        <span>{char}</span>
      )}
    </motion.div>
  );
};

export default InputText;
