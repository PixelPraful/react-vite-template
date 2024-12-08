import { theme, ThemeConfig } from "antd";

const themeConfigDark: ThemeConfig = {
  token: {
    colorPrimary: "#1890ff", // Primary color
    colorBgLayout: "#333333", // Background color for page
    colorText: "#ffffff", // Text color
    borderRadius: 4, // Border radius for components,
    // Add more customizations for dark mode
  },
  algorithm: theme.darkAlgorithm,
};

export default themeConfigDark;
