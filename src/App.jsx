import React, { useState, useEffect } from "react";
import GenerateWords from "./components/GenerateWords";
import InputText from "./components/InputText";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { VscDebugRestart } from "react-icons/vsc";
import { faker } from "@faker-js/faker";
import Result from "./components/Result";
import { countErrors, getAccuracy, wpm } from "./utils/helpers/helpers";

export const App = () => {
  const [userInput, setUserInput] = useState([]);
  const [timer, setTimer] = useState(10);
  const [flag, setFlag] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [words, setWords] = useState("");

  useEffect(() => {
    setWords(faker.word.words(20));
  }, []);

  // console.log(words);
  useEffect(() => {
    let intervalId;
    if (flag) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            setFlag(false);
            setIsFinish(true);
            // console.log(userInput);
            return 0;
          }
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [flag]);

  const handleKeyPress = (e) => {
    const char = e.key;
    if (e.keyCode === 8) {
      if (userInput.length > 0) {
        setUserInput((prevInput) => prevInput.slice(0, -1));
      }
    } else {
      setFlag(true);
      setUserInput((prevInput) => [...prevInput, char]);
    }
  };

  const restartGame = () => {
    setTimer(10);
    setUserInput([]);
    setFlag(false);
    setIsFinish(false)
  };

  return (
    <div
      className="h-screen w-screen overflow-hidden bg-bgPrimary font-roboto px-48 flex flex-col justify-between"
      tabIndex="0"
      onKeyDown={handleKeyPress}
    >
      <Navbar />
      <div className="">
      {isFinish ? (
        <Result
          userChar={userInput.length}
          textToWrite={words.split("").slice(0, userInput.length)}
          errors={countErrors(
            words.split("").slice(0, userInput.length),
            userInput
          )}
          accuracy={getAccuracy(
            userInput.length,
            countErrors(words.split("").slice(0, userInput.length), userInput)
          )}
          wpm={wpm(
            userInput.length,
            countErrors(words.split("").slice(0, userInput.length), userInput),
            timer
          )}
        />
      ) : (
        <div className="leading-relaxed text-2xl tracking-wider flex-1 flex flex-col justify-center flex-wrap">
          <div className="text-caret py-8">{timer}</div>
          <div className="relative min-h-28 break-all">
            <GenerateWords words={words} />
            <InputText text={userInput} textToWrite={words} />
          </div>
        </div>
      )}
      </div>
      <div className="flex justify-center py-3 bg-t">
        <VscDebugRestart
          className="text-typography cursor-pointer text-xl"
          onClick={restartGame}
        />
      </div>
      <Footer />
    </div>
  );
};

export default App;
