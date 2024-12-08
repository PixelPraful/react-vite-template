import React from "react";
import { Switch } from "antd";
import { BulbOutlined, MoonOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { toggleTheme } from "../../redux/actions/themeActions";

const ThemeSwitcher: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="theme-switcher">
      <Switch
        className="custom-switch"
        checked={theme === "dark"}
        onChange={handleThemeToggle}
        checkedChildren={<MoonOutlined />}
        unCheckedChildren={<BulbOutlined />}
      />
    </div>
  );
};

export default ThemeSwitcher;
