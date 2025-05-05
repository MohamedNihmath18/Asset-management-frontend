// // Sidebar.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { LayoutDashboard, Calendar, FileText, HardDrive, Wrench } from "lucide-react";

// const Sidebar = () => {
//   const navigate = useNavigate();

//   return (
      
 
// <div className="w-64 min-h-screen bg-gray-800 text-white p-6">
//       <h2 className="text-xl font-bold mb-6">Asset Management</h2>
//       <ul className="space-y-3">
//         <li
//           className="py-3 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 cursor-pointer transition duration-200"
//           onClick={() => navigate("/")}
//         >
//          <LayoutDashboard size={20} /> Dashboard
//         </li>
//         <li
//           className="py-3 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 cursor-pointer transition duration-200"
//           onClick={() => navigate("/warranty")}
//         >
//           <Calendar size={20} />Warranty End Date
//         </li>
//         <li
//           className="py-3 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 cursor-pointer transition duration-200"
//           onClick={() => navigate("/ppm")}
//         >
//           <Calendar size={20} />PPM End Date
//         </li>
//         <li
//           className="py-3 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 cursor-pointer transition duration-200"
//           onClick={() => navigate("/service-report")}
//         >
//           <FileText size={20} />Service Report
//         </li>
//         <li
//           className="py-3 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 cursor-pointer transition duration-200"
//           onClick={() => navigate("/assets")}
//         >
//           <HardDrive size={20} />Assets
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  HardDrive,
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/" },
    { label: "Warranty End Date", icon: <Calendar size={20} />, path: "/warranty" },
    { label: "PPM End Date", icon: <Calendar size={20} />, path: "/ppm" },
    { label: "Service Report", icon: <FileText size={20} />, path: "/service-report" },
    { label: "Assets", icon: <HardDrive size={20} />, path: "/assets" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-gray-800 text-white transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      } z-50`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6">
          {isOpen ? "Asset Mgmt" : "💼"}
        </h2>
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-700 cursor-pointer"
              onClick={() => navigate(item.path)}
            >
              <span className="text-white">{item.icon}</span>
              {isOpen && <span>{item.label}</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
