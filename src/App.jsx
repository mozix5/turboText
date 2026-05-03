import React from "react";
import InputText from "./components/InputText";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ControlBar from "./components/ControlBar";
import { VscDebugRestart } from "react-icons/vsc";
import Result from "./components/Result";
import { AnimatePresence, motion } from "framer-motion";
import { BsCursorFill } from "react-icons/bs";
import useTypingTest from "./hooks/useTypingTest";

export const App = () => {
  const {
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
    handlers,
  } = useTypingTest();

  const {
    handleKeyPress,
    restartGame,
    handleTimeChange,
    setSoundEnabled,
    setIsFocused,
  } = handlers;

  return (
    <div className="h-screen w-full overflow-hidden bg-bgPrimary font-roboto px-6 lg:px-48 flex flex-col justify-between py-4 transition-colors duration-500">
      <Navbar />

      <main className="flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full">
        {!isFinished && (
          <ControlBar 
            timeLimit={timeLimit} 
            onTimeChange={handleTimeChange}
            soundEnabled={soundEnabled}
            onToggleSound={() => setSoundEnabled(!soundEnabled)}
          />
        )}

        <div className="mt-4 relative">
          <AnimatePresence mode="wait">
            {isFinished ? (
              <Result
                key="result"
                userChar={userInput.length}
                errors={stats.errors}
                accuracy={stats.accuracy}
                wpm={stats.wpm}
                rawWpm={stats.rawWpm}
                history={stats.history}
                onRestart={restartGame}
              />
            ) : (
              <motion.div
                key="typing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="leading-relaxed text-2xl outline-none tracking-wider relative"
                ref={inputRef}
                onKeyDown={handleKeyPress}
                tabIndex={0}
                onBlur={() => setIsFocused(false)}
                onFocus={() => setIsFocused(true)}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-8">
                    <div className="text-4xl font-bold text-caret w-20">{timer}s</div>
                    {hasStarted && (
                      <div className="flex gap-6 text-sm font-bold text-textSecondary uppercase tracking-widest">
                        <div className="flex gap-2">
                          <span>wpm</span>
                          <span className="text-textPrimary">{stats.wpm}</span>
                        </div>
                        <div className="flex gap-2">
                          <span>acc</span>
                          <span className="text-textPrimary">{stats.accuracy.toFixed(0)}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {hasStarted && (
                    <div className="h-1 flex-1 max-w-xs ml-10 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-caret"
                        initial={{ width: "100%" }}
                        animate={{ width: `${(timer / timeLimit) * 100}%` }}
                        transition={{ duration: 1, ease: "linear" }}
                      />
                    </div>
                  )}
                </div>

                <div className="relative min-h-[200px] bg-black/5 rounded-2xl p-8 border border-white/5">
                  <InputText text={userInput} textToWrite={words} />
                  
                  {!isFocused && (
                    <div
                      onClick={() => inputRef.current.focus()}
                      className="glass-container absolute inset-0 text-textSecondary text-xl font-bold flex flex-col justify-center items-center gap-4 cursor-pointer z-50 rounded-2xl"
                    >
                      <BsCursorFill className="-rotate-[80deg] text-4xl text-caret animate-bounce" />
                      <span className="tracking-widest uppercase text-sm">Click to resume focus</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {!isFinished && (
        <div className="flex flex-col items-center gap-2 py-2">
          <div className="flex items-center gap-2 text-textSecondary text-sm opacity-50">
            <kbd className="px-2 py-1 bg-bgSecondary rounded border border-white/10">tab</kbd>
            <span>to quick restart</span>
          </div>
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
          >
            <VscDebugRestart
              className="text-textSecondary hover:text-caret cursor-pointer text-3xl transition-colors"
              onClick={restartGame}
            />
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default App;
