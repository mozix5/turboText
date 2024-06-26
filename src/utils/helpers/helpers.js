export const changeTheme = (theme) => {
  document.querySelector("html")?.setAttribute("data-theme", theme);
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

export const wpm = (totalCharacters, errors, time) => {
  if (totalCharacters === 0) return 100; // Handle division by zero
  const netWpm = (totalCharacters / 5 - errors) / (15 / 60);
  return netWpm;
};
