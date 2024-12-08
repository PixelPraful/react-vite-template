import React from "react";
import ThemeSwitcher from "../components/Theme/ThemeSwitcher";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { setSuccessMessage } from "../redux/actions/appActions";

const MainPage: React.FC<unknown> = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Welcome to the Main Page!</h1>
      <ThemeSwitcher />
      <Button
        style={{ marginTop: "10px" }}
        onClick={() => dispatch(setSuccessMessage("Success"))}
      >
        Get Notification
      </Button>
    </div>
  );
};

export default MainPage;
