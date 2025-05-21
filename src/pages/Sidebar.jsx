// Sidebar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Calendar, FileText, HardDrive, Wrench } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
      
 
<div className="w-64 min-h-screen bg-gray-800 text-white p-6">
      {/* <h2 className="text-xl font-bold mb-6">Asset Management</h2> */}
      <ul className="space-y-3">
        <li
          className="py-3 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 cursor-pointer transition duration-200"
          onClick={() => navigate("/")}
        >
         <LayoutDashboard size={20} /> Dashboard
        </li>
        <li
          className="py-3 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 cursor-pointer transition duration-200"
          onClick={() => navigate("/warranty")}
        >
          <Calendar size={20} />Warranty End Date
        </li>
        <li
          className="py-3 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 cursor-pointer transition duration-200"
          onClick={() => navigate("/ppm")}
        >
          <Calendar size={20} />PPM End Date
        </li>
        <li
          className="py-3 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 cursor-pointer transition duration-200"
          onClick={() => navigate("/service-report")}
        >
          <FileText size={20} />Service Report
        </li>
        <li
          className="py-3 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 cursor-pointer transition duration-200"
          onClick={() => navigate("/assets")}
        >
          <HardDrive size={20} />Assets
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

 