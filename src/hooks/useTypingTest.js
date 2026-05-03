import { useState, useEffect, useRef, useCallback } from "react";
import { faker } from "@faker-js/faker";
import { countErrors, getAccuracy, wpm, rawWpm } from "../utils/helpers/helpers";

// Global AudioContext singleton to prevent resource exhaustion
let audioCtx = null;

const useTypingTest = () => {
  const [userInput, setUserInput] = useState([]);
  const [timeLimit, setTimeLimit] = useState(15);
  const [timer, setTimer] = useState(15);
  const [hasStarted, setHasStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [words, setWords] = useState("");
  const [isFocused, setIsFocused] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [wpmHistory, setWpmHistory] = useState([]);
  
  // Total keystrokes tracking for "Real Accuracy"
  const [totalTyped, setTotalTyped] = useState(0);
  const [totalErrors, setTotalErrors] = useState(0);
  
  const inputRef = useRef();
  const userInputRef = useRef(userInput);
  const wordsRef = useRef(words);

  useEffect(() => {
    userInputRef.current = userInput;
  }, [userInput]);

  useEffect(() => {
    wordsRef.current = words;
  }, [words]);

  // Optimized sound player
  const playClickSound = useCallback(() => {
    if (!soundEnabled) return;

    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
  }, [soundEnabled]);

  const generateNewWords = useCallback(() => {
    setWords(faker.word.words(50));
    setWpmHistory([]);
    setTotalTyped(0);
    setTotalErrors(0);
  }, []);

  const appendMoreWords = useCallback(() => {
    setWords((prev) => prev + " " + faker.word.words(30));
  }, []);

  const restartGame = useCallback((newTimeLimit = null) => {
    const finalTimeLimit = typeof newTimeLimit === "number" ? newTimeLimit : timeLimit;
    setTimer(finalTimeLimit);
    setUserInput([]);
    setHasStarted(false);
    setIsFinished(false);
    generateNewWords();
  }, [timeLimit, generateNewWords]);

  // Handle focus when starting or restarting
  useEffect(() => {
    if (!isFinished && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFinished]);

  useEffect(() => {
    generateNewWords();
  }, [generateNewWords]);

  // Global focus handler
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (isFinished || document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "BUTTON") {
        return;
      }
      if (document.activeElement !== inputRef.current && inputRef.current) {
        inputRef.current.focus();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isFinished]);

  useEffect(() => {
    let intervalId;
    if (hasStarted) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          const elapsed = timeLimit - prevTimer + 1;
          const currentWpm = wpm(
            userInputRef.current.length, 
            countErrors(wordsRef.current.split("").slice(0, userInputRef.current.length), userInputRef.current), 
            timeLimit, 
            elapsed
          );
          const currentRaw = rawWpm(userInputRef.current.length, elapsed);
          
          setWpmHistory(prev => [...prev, { second: elapsed, wpm: currentWpm, raw: currentRaw }]);

          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            setHasStarted(false);
            setIsFinished(true);
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [hasStarted, timeLimit]);

  const handleKeyPress = useCallback((e) => {
    if (isFinished) return;

    if (e.key === "Tab") {
      e.preventDefault();
      restartGame();
      return;
    }

    if (e.key === "Backspace") {
      playClickSound();
      if (userInput.length > 0) {
        if (e.ctrlKey || e.metaKey) {
          setUserInput((prev) => prev.slice(0, prev.lastIndexOf(" ") + 1));
        } else {
          setUserInput((prev) => prev.slice(0, -1));
        }
      }
      return;
    }

    if (e.key.length === 1) {
      if (!hasStarted) setHasStarted(true);
      playClickSound();
      
      setTotalTyped(prev => prev + 1);
      if (e.key !== words[userInput.length]) {
        setTotalErrors(prev => prev + 1);
      }
      
      setUserInput((prev) => [...prev, e.key]);

      if (userInput.length > words.length - 100) {
        appendMoreWords();
      }
    }
  }, [isFinished, hasStarted, playClickSound, restartGame, userInput.length, words, appendMoreWords]);

  const handleTimeChange = useCallback((newTime) => {
    setTimeLimit(newTime);
    restartGame(newTime);
  }, [restartGame]);

  const stats = {
    wpm: wpm(userInput.length, countErrors(words.split("").slice(0, userInput.length), userInput), timeLimit, timeLimit - timer),
    rawWpm: rawWpm(userInput.length, timeLimit - timer),
    accuracy: totalTyped > 0 ? Math.max(0, ((totalTyped - totalErrors) / totalTyped) * 100) : 100,
    errors: countErrors(words.split("").slice(0, userInput.length), userInput),
    history: wpmHistory,
  };

  return {
    userInput,
    words,
    timer,
    timeLimit,
    hasStarted,
    isFinished,
    isFocused,
    soundEnabled,
    stats,
    inputRef,
    handlers: {
      handleKeyPress,
      restartGame,
      handleTimeChange,
      setSoundEnabled,
      setIsFocused,
    }
  };
};

export default useTypingTest;
