import React, { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { VscDebugRestart } from "react-icons/vsc";
import { HiOutlineDownload } from "react-icons/hi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { toPng } from "html-to-image";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-bgSecondary border border-white/10 p-3 rounded-lg shadow-xl backdrop-blur-md">
        <p className="text-xs text-textSecondary uppercase tracking-widest mb-1">{`Second ${label}`}</p>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-bold text-caret">{`wpm: ${payload[0].value}`}</p>
          <p className="text-sm font-bold text-textSecondary">{`raw: ${payload[1].value}`}</p>
        </div>
      </div>
    );
  }
  return null;
};

const Result = ({ userChar, errors, accuracy, wpm, rawWpm, history, onRestart }) => {
  const exportRef = useRef(null);

  const stats = [
    { label: "wpm", value: wpm, color: "text-caret", desc: "Words per minute" },
    { label: "acc", value: `${accuracy.toFixed(0)}%`, color: "text-textPrimary", desc: "Accuracy" },
    { label: "raw", value: rawWpm, color: "text-textSecondary", desc: "Raw words per minute" },
    { label: "char", value: userChar, color: "text-textPrimary", desc: "Characters typed" },
    { label: "error", value: errors, color: "text-error", desc: "Typos made" },
  ];

  const handleDownload = useCallback(() => {
    if (exportRef.current === null) return;

    toPng(exportRef.current, { 
      cacheBust: true,
      backgroundColor: "var(--bg-primary)",
      style: {
        padding: "40px",
        borderRadius: "20px"
      }
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `turbotext-result-${wpm}wpm.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Oops, something went wrong!", err);
      });
  }, [wpm]);

  const themeCaret = "var(--caret-color)";
  const themeSecondary = "var(--text-secondary)";

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <motion.div
        ref={exportRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-6 py-6 w-full max-w-5xl mx-auto bg-bgPrimary"
      >
        {/* Branding (for export) */}
        <div className="w-full flex justify-between items-center px-4 mb-2 opacity-50">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-caret">TurboText Result</span>
          <span className="text-[10px] text-textSecondary uppercase">mozix.dev</span>
        </div>

        {/* Main Stats */}
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 w-full">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center group relative"
            >
              <span className="text-[10px] font-bold text-textSecondary uppercase tracking-widest mb-1 opacity-70">
                {stat.label}
              </span>
              <span className={`text-4xl md:text-5xl font-bold ${stat.color} transition-transform group-hover:scale-110 duration-300`}>
                {stat.value}
              </span>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[8px] text-textSecondary uppercase tracking-widest pointer-events-none">
                {stat.desc}
              </div>
            </motion.div>
          ))}
        </div>

        {/* WPM Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full h-[200px] mt-4 bg-black/10 rounded-2xl p-4 border border-white/5"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--text-secondary)" opacity={0.1} vertical={false} />
              <XAxis 
                dataKey="second" 
                stroke={themeSecondary} 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                label={{ value: "seconds", position: "insideBottomRight", offset: -5, fontSize: 10, fill: themeSecondary }}
              />
              <YAxis 
                stroke={themeSecondary} 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                label={{ value: "wpm", angle: -90, position: "insideLeft", fontSize: 10, fill: themeSecondary }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: themeCaret, strokeWidth: 1, strokeDasharray: "5 5" }} />
              <Line 
                type="monotone" 
                dataKey="wpm" 
                stroke={themeCaret} 
                strokeWidth={3} 
                dot={{ fill: themeCaret, r: 0 }} 
                activeDot={{ r: 6, stroke: themeCaret, strokeWidth: 2, fill: "var(--bg-primary)" }}
                animationDuration={1500}
              />
              <Line 
                type="monotone" 
                dataKey="raw" 
                stroke={themeSecondary} 
                strokeWidth={2} 
                strokeDasharray="5 5"
                dot={false}
                opacity={0.3}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex gap-6 mt-2">
        <motion.button
          whileHover={{ scale: 1.2, color: "var(--caret-color)" }}
          whileTap={{ scale: 0.9 }}
          onClick={onRestart}
          title="Restart Test"
          className="p-2 text-textSecondary transition-colors"
        >
          <VscDebugRestart className="text-xl" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.2, color: "var(--caret-color)" }}
          whileTap={{ scale: 0.9 }}
          onClick={handleDownload}
          title="Download Image"
          className="p-2 text-textSecondary transition-colors"
        >
          <HiOutlineDownload className="text-xl" />
        </motion.button>
      </div>
    </div>
  );
};

export default Result;
