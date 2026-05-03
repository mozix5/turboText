export const changeTheme = (theme) => {
  console.log("Changing theme to:", theme);
  document.documentElement.setAttribute("data-theme", theme);
};

export const countErrors = (expected, userInput) => {
  let errors = 0;
  userInput.forEach((char, index) => {
    if (expected[index] !== char) {
      errors++;
    }
  });
  return errors;
};

export const getAccuracy = (userWords, errors) => {
  if (userWords === 0) return 100; // Handle division by zero
  const correct = userWords - errors;
  return (correct / userWords) * 100;
};

export const wpm = (totalCharacters, errors, timeLimit, elapsedSeconds) => {
  if (totalCharacters === 0 || elapsedSeconds === 0) return 0;
  const minutes = elapsedSeconds / 60;
  // Standard WPM: only correct characters count
  const netWpm = Math.max(0, (totalCharacters / 5 - errors) / minutes);
  return Math.round(netWpm);
};

export const rawWpm = (totalCharacters, elapsedSeconds) => {
  if (totalCharacters === 0 || elapsedSeconds === 0) return 0;
  const minutes = elapsedSeconds / 60;
  // Raw WPM: all typed characters count
  return Math.round((totalCharacters / 5) / minutes);
};
