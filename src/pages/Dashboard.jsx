import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate()
  return (
    <div className="bg-red-500 w-screen">
      <button onClick={()=>navigate("/dashboard/field")}>Manage Custom Fields</button>
    </div>
  );
};

export default Dashboard;
