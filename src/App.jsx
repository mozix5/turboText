import React from "react";
import GenerateWords from "./components/GenerateWords";
import { changeTheme } from "./utils/helpers/changeTheme";
import InputText from "./components/InputText";

const App = () => {
  return (
    <div className=" h-screen bg-primary">
      <div>
        <GenerateWords />
        <InputText text="hello"/>
      </div>
      <button onClick={() => changeTheme("")}>theme1</button>
      <button onClick={() => changeTheme("theme2")}>theme2</button>
      <button onClick={() => changeTheme("theme3")}>theme3</button>
    </div>
  );
};

export default App;
