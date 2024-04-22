import React from "react";

const Result = ({ userWords, textToWrite, errors,accuracy,wpm }) => {
  
  return (
    <div className="flex-1 text-caret flex items-center text-2xl justify-center flex-col">
      <div>Result: </div>
      <div>Total Errors: {errors}</div>
      <div>Accuracy: {accuracy}%</div>
      <div>words per minute: {wpm}%</div>
    </div>
  );
};

export default Result;
