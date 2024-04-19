import React from "react";

const InputText = ({ text }) => {
  // const userText = text.split("");
  return (
    <div className=" text-secondary ">
      {text?.map((item, index) => {
        return <span key={index}>{item}</span>;
      })}
    </div>
  );
};

export default InputText;
