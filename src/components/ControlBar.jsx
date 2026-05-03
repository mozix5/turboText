import React from "react";
import { motion } from "framer-motion";
import { changeTheme } from "../utils/helpers/helpers";

const THEMES = [
  { id: "default", name: "Carbon", color: "#262a33" },
  { id: "theme2", name: "Deep", color: "#212121" },
  { id: "theme3", name: "Nord", color: "#262a33" },
  { id: "theme4", name: "Yellow", color: "#212121" },
];

const TIME_PRESETS = [15, 30, 60, 120];

const ControlBar = ({ timeLimit, onTimeChange, soundEnabled, onToggleSound }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center justify-center gap-12 py-4 px-6 rounded-xl bg-bgSecondary/30 border border-white/5 backdrop-blur-sm mx-auto w-fit"
    >
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-textSecondary uppercase tracking-widest">Time</span>
          <div className="flex bg-black/20 rounded-lg p-1">
            {TIME_PRESETS.map((t) => (
              <button
                key={t}
                onClick={() => onTimeChange(t)}
                className={`px-4 py-1.5 rounded-md text-sm transition-all ${
                  timeLimit === t 
                    ? "bg-caret text-bgPrimary font-bold" 
                    : "text-textSecondary hover:text-textPrimary"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 border-l border-white/10 pl-6">
          <span className="text-xs font-bold text-textSecondary uppercase tracking-widest">Sound</span>
          <button
            onClick={onToggleSound}
            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all border ${
              soundEnabled 
                ? "border-caret text-caret bg-caret/10" 
                : "border-white/10 text-textSecondary"
            }`}
          >
            {soundEnabled ? "ON" : "OFF"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ControlBar;
