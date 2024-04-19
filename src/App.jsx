import React, { useState } from "react";
import GenerateWords from "./components/GenerateWords";
import InputText from "./components/InputText";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Caret from "./components/Caret";

export const App = () => {
  const [userInput, setUserInput] = useState([]);
  const handleKeyPress = (e) => {
    setUserInput((pre) => {
      return [...pre, e.key];
    });
  };
  console.log(userInput);
  return (
    <div
      className=" h-screen bg-primary font-roboto px-48 flex flex-col"
      onKeyDown={handleKeyPress}
      tabIndex="0"
    >
      <Navbar />
      <div className=" leading-relaxed text-2xl tracking-wider flex-1 items-center flex">
        <div className="relative flex items-center">
          <GenerateWords />
          <div className="absolute top-0 flex items-center ">
            <InputText text={userInput} />
            <Caret />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
