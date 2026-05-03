import React from "react";

const GenerateWords = ({ words }) => {
  const targetWords = words.split(" ");

  return (
    <div className="text-textSecondary leading-relaxed tracking-wider flex flex-wrap">
      {targetWords.map((word, index) => (
        <div key={index} className="flex whitespace-nowrap">
          {word}{index < targetWords.length - 1 ? "\u00A0" : ""}
        </div>
      ))}
    </div>
  );
};

export default React.memo(GenerateWords);
