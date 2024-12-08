import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <Button onClick={() => navigate("/admin")}> Go To Admin</Button>
    </div>
  );
};

export default Dashboard;
