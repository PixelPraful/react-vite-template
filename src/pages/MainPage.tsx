import React from "react";
import ThemeSwitcher from "../components/Theme/ThemeSwitcher";

const MainPage: React.FC<unknown> = () => {
  return (
    <div>
      <h1>Welcome to the Main Page!</h1>
      <ThemeSwitcher />
    </div>
  );
};

export default MainPage;
