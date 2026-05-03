import React, { useMemo, useRef, useEffect, useState } from "react";
import Caret from "./Caret";
import { AnimatePresence, motion } from "framer-motion";

const InputText = ({ text, textToWrite }) => {
  const targetWords = useMemo(() => textToWrite.split(" "), [textToWrite]);
  const containerRef = useRef(null);
  const caretRef = useRef(null);
  const [translateY, setTranslateY] = useState(0);

  let charCounter = 0;

  // Handle line-by-line scrolling
  useEffect(() => {
    if (caretRef.current && containerRef.current) {
      const caretTop = caretRef.current.offsetTop;
      const lineHeight = 40; // Height of one line

      // For 3 lines, we start shifting as soon as we move past the first line
      if (caretTop >= lineHeight) {
        setTranslateY(-(caretTop - lineHeight));
      } else {
        setTranslateY(0);
      }
    }
  }, [text.length]);

  return (
    <div 
      className="relative w-full overflow-hidden" 
      style={{ height: "120px" }} // Fixed height for exactly 3 lines (3 * 40px)
      ref={containerRef}
    >
      <motion.div 
        animate={{ y: translateY }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
        className="h-fit text-textSecondary relative flex flex-wrap leading-relaxed tracking-wider pointer-events-none p-1"
      >
        {targetWords.map((word, wordIndex) => {
          const wordChars = word.split("");
          // Add a space after each word except the last one
          const displayChars = wordIndex < targetWords.length - 1 ? [...wordChars, " "] : wordChars;

          return (
            <div key={wordIndex} className="flex whitespace-nowrap">
              {displayChars.map((char, i) => {
                const globalIndex = charCounter++;
                const typedChar = text[globalIndex];
                const isCurrent = globalIndex === text.length;

                return (
                  <div 
                    key={globalIndex} 
                    className="relative flex items-center"
                    ref={isCurrent ? caretRef : null}
                  >
                    {isCurrent && <Caret />}
                    
                    {/* Background Character (always visible) */}
                    <span className="opacity-40">
                      {char === " " ? "\u00A0" : char}
                    </span>

                    {/* Typed Character (animated on top) */}
                    <div className="absolute inset-0">
                      <AnimatePresence>
                        {typedChar !== undefined && (
                          <Character 
                            char={char} 
                            flag={typedChar !== char} 
                          />
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
        {/* Final Caret */}
        {text.length === textToWrite.length && (
          <div className="relative flex items-center" ref={caretRef}>
            <Caret />
          </div>
        )}
      </motion.div>
    </div>
  );
};

const Character = ({ char, flag }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.1 }}
      className={`absolute inset-0 ${flag ? "text-error" : "text-textPrimary"}`}
    >
      {char === " " ? (
        <span className={`${flag ? "bg-error/30 underline" : ""}`}>
          {"\u00A0"}
        </span>
      ) : (
        <span>{char}</span>
      )}
    </motion.div>
  );
};

export default React.memo(InputText);
