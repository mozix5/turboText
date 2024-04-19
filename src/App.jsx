import React, { useState, useEffect } from "react";
import GenerateWords from "./components/GenerateWords";
import InputText from "./components/InputText";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Caret from "./components/Caret";
import { VscDebugRestart } from "react-icons/vsc";

export const App = () => {
  const [userInput, setUserInput] = useState([]);
  const [timer, setTimer] = useState(30); // Initial timer value
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    let intervalId;
    if (flag) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1); 
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [flag]); 

  const handleKeyPress = (e) => {
    setFlag(true); 
    setUserInput((prevInput) => [...prevInput, e.key]);
  };

  const restartGame = () => {
    setTimer(30); 
    setUserInput([]); 
    setFlag(false); 
  };

  return (
    <div
      className="h-screen bg-primary font-roboto px-48 flex flex-col"
      onKeyDown={handleKeyPress}
      tabIndex="0"
    >
      <Navbar />
      <div className="leading-relaxed text-2xl tracking-wider flex-1 flex flex-col justify-center">
        <div className="text-typography">{timer}</div>
        <div className="relative mb-4">
          <GenerateWords />
          <div className="absolute top-0 flex items-center min-h-10">
            <InputText text={userInput} />
            <Caret />
          </div>
        </div>
        <div className="flex justify-center py-6">
          <VscDebugRestart
            className="text-typography cursor-pointer"
            onClick={restartGame}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
