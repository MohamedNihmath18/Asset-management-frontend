// Sidebar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
      
    <div className=" w-64  h-screen bg-gray-800 text-white p-6 fixed top-0 left-0">
      <h2 className="text-xl font-bold mb-6">Asset Management System</h2>
      <ul className="space-y-3">
        <li
          className="py-3 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 cursor-pointer transition duration-200"
          onClick={() => navigate("/")}
        >
          Dashboard
        </li>
        <li
          className="py-3 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 cursor-pointer transition duration-200"
          onClick={() => navigate("/warranty")}
        >
          Warranty End Date
        </li>
        <li
          className="py-3 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 cursor-pointer transition duration-200"
          onClick={() => navigate("/ppm")}
        >
          PPM End Date
        </li>
        <li
          className="py-3 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 cursor-pointer transition duration-200"
          onClick={() => navigate("/service-report")}
        >
          Service Report
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
