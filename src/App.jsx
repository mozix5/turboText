import React, { useState, useEffect } from "react";
import GenerateWords from "./components/GenerateWords";
import InputText from "./components/InputText";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { VscDebugRestart } from "react-icons/vsc";
import { faker } from "@faker-js/faker";

export const App = () => {
  const [userInput, setUserInput] = useState([]);
  const [timer, setTimer] = useState(30); // Initial timer value
  const [flag, setFlag] = useState(false);
  const [words, setWords] = useState("");

  useEffect(() => {
    setWords(faker.word.words(20));
    // console.log(words);
  }, []);

  useEffect(() => {
    let intervalId;
    if (flag) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            setFlag(false);
            return 0;
          }
        });
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
      className="h-screen w-screen overflow-hidden bg-primary font-roboto px-48 flex flex-col"
      onKeyDown={handleKeyPress}
      tabIndex="0"
    >
      <Navbar />
      <div className="leading-relaxed text-2xl tracking-wider flex-1 flex flex-col justify-center flex-wrap">
        <div className="text-caret py-8">{timer}</div>
        <div className="relative mb-4 h-28 break-all">
          <GenerateWords words={words} />
          <InputText text={userInput} textToWrite={words} />
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
