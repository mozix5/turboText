import React, { useState, useEffect, useRef } from "react";
import GenerateWords from "./components/GenerateWords";
import InputText from "./components/InputText";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { VscDebugRestart } from "react-icons/vsc";
import { faker } from "@faker-js/faker";
import Result from "./components/Result";
import { countErrors, getAccuracy, wpm } from "./utils/helpers/helpers";
import { AnimatePresence } from "framer-motion";
import { BsCursorFill } from "react-icons/bs";

export const App = () => {
  const [userInput, setUserInput] = useState([]);
  const [timer, setTimer] = useState(15);
  const [flag, setFlag] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [words, setWords] = useState("");
  const [isFocused, setIsFocused] = useState(true);
  const inputRef = useRef();

  useEffect(() => {
    setWords(faker.word.words(30));
    inputRef.current.focus();
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
    // console.log(e);
    if (e.key === "Backspace") {
      if (userInput.length > 0) {
        return e.ctrlKey
          ? setUserInput((prevInput) =>
              prevInput.slice(0, prevInput.lastIndexOf(" ") + 1)
            )
          : setUserInput((prevInput) => prevInput.slice(0, -1));
      }
    } else if (e.key == " ") {
      setUserInput((prevInput) => [...prevInput, char]);
    } else if (e.keyCode >= 65 && e.keyCode <= 90) {
      setFlag(true);
      return e.shiftKey
        ? setUserInput((prevInput) => [...prevInput, char.toUpperCase()])
        : setUserInput((prevInput) => [...prevInput, char]);
    }
  };

  const restartGame = () => {
    setTimer(15);
    setUserInput([]);
    setFlag(false);
    setIsFinish(false);
    setIsFocused(false);
    // inputRef.current.focus();
  };

  const handleFocus = () => {
    setIsFocused(false);
    setFlag(false);
  };
  return (
    <div className="h-screen w-screen overflow-hidden bg-bgPrimary font-roboto px-6 lg:px-48 flex flex-col justify-between">
      <Navbar />
      <div className="">
        <AnimatePresence>
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
                countErrors(
                  words.split("").slice(0, userInput.length),
                  userInput
                )
              )}
              wpm={wpm(
                userInput.length,
                countErrors(
                  words.split("").slice(0, userInput.length),
                  userInput
                ),
                timer
              )}
            />
          ) : (
            <div
              className="leading-relaxed text-2xl outline-none tracking-wider flex-1 flex flex-col justify-center flex-wrap"
              ref={inputRef}
              onKeyDown={handleKeyPress}
              tabIndex={0}
              onBlur={handleFocus}
            >
              <div className="text-caret py-8">{timer}</div>
              <div className="relative min-h-28 break-all">
                <GenerateWords words={words} />
                <InputText text={userInput} textToWrite={words} />
                {!isFocused && (
                  <div
                    onClick={() => setIsFocused(true)}
                    className="glass-container absolute top-0 left-0 right-0 bottom-0 text-gray-500 text-lg font-bold flex justify-center items-center gap-2"
                  >
                    <span className=" cursor-default">Click here to focus</span>
                    <BsCursorFill className=" -rotate-[80deg]" />
                  </div>
                )}
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex justify-center py-3">
        <VscDebugRestart
          className="text-textSecondary cursor-pointer text-xl"
          onClick={restartGame}
        />
      </div>
      <Footer />
    </div>
  );
};

export default App;
