import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleBasedRoute from "./components/Auth/RoleBasedRoute";
import Login from "./components/Auth/Login";
import Dashboard from "./pages/Dashboard";
import AdminPage from "./pages/AdminPage";
import NotAuthorized from "./pages/NotAuthorized";
import MainPage from "./pages/MainPage";
import {
  ROUTE_ADMIN,
  ROUTE_DASHBOARD,
  ROUTE_LOGIN,
  ROUTE_MAIN,
  ROUTE_NOT_AUTHORIZED,
} from "./utils/routes";
import { ConfigProvider } from "antd";
import themeConfigLight from "./utils/themeConfigLight";
import themeConfigDark from "./utils/themeConfigDark";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import Notification from "./components/Common/Notification";

const App: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    document.body.className = theme === "dark" ? "dark-theme" : "light-theme";
  }, [theme]);

  return (
    <ConfigProvider
      theme={theme === "dark" ? themeConfigDark : themeConfigLight}
    >
      <Router>
        <Routes>
          <Route path={ROUTE_MAIN} element={<MainPage />} />
          <Route path={ROUTE_LOGIN} element={<Login />} />
          <Route path={ROUTE_NOT_AUTHORIZED} element={<NotAuthorized />} />
          <Route
            path={ROUTE_DASHBOARD}
            element={
              <RoleBasedRoute allowedRoles={["admin", "user"]}>
                <Dashboard />
              </RoleBasedRoute>
            }
          />
          <Route
            path={ROUTE_ADMIN}
            element={
              <RoleBasedRoute allowedRoles={["admin"]}>
                <AdminPage />
              </RoleBasedRoute>
            }
          />
        </Routes>
      </Router>
      <Notification />
    </ConfigProvider>
  );
};

export default App;
