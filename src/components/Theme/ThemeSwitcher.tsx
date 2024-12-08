import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleTheme,
  setLightTheme,
  setDarkTheme,
} from "../../redux/actions/themeActions";
import { RootState } from "../../app/store";

const ThemeSwitcher: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  const handleSetLight = () => {
    dispatch(setLightTheme());
  };

  const handleSetDark = () => {
    dispatch(setDarkTheme());
  };

  return (
    <div>
      <button onClick={handleToggle}>Toggle Theme (Current: {theme})</button>
      <button onClick={handleSetLight}>Set Light Theme</button>
      <button onClick={handleSetDark}>Set Dark Theme</button>
    </div>
  );
};

export default ThemeSwitcher;
