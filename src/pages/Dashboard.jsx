// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { PlusCircle, List } from "lucide-react";

// const Dashboard = () => {
//   const [assets, setAssets] = useState([]);
//   const [totalAssets, setTotalAssets] = useState(0);
//   const navigate = useNavigate(); // Initialize useNavigate


   

//   useEffect(() => {
//     // Fetch all assets
//     const fetchAssets = async () => {
//       try {
//         const response = await axios.get("https://asset-management-backend-vegp.onrender.com/api/assets");
//         setAssets(response.data.assets.slice(0, 5)); // Show only recent 5
//         setTotalAssets(response.data.assets.length);
//       } catch (error) {
//         console.error("Error fetching assets:", error);
//       }
//     };

//     fetchAssets();
//   }, []);

//   return (
//     <div className="p-6">
       

//       {/* Header */}
//       <h1 className="text-3xl font-bold text-blue-700">Dashboard</h1>

//       {/* Stats Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//         <div className="bg-white shadow-lg p-4 rounded-xl border-l-4 border-blue-600">
//           <h2 className="text-lg font-semibold">Total Assets</h2>
//           <p className="text-2xl font-bold mt-2">{totalAssets}</p>
//         </div>
//       </div>

//       {/* Recent Assets */}
//       <div className="mt-8">
//         <h2 className="text-xl font-semibold text-gray-700">Recent Assets</h2>
//         <div className="bg-white shadow-md rounded-lg mt-4 overflow-hidden">
//           <table className="w-full">
//             <thead className="bg-blue-600 text-white">
//               <tr>
//                 <th className="py-2 px-4 text-left">#</th>
//                 <th className="py-2 px-4 text-left">Equipment Name</th>
//                 <th className="py-2 px-4 text-left">Asset No</th>
//                 <th className="py-2 px-4 text-left">Department</th>
//               </tr>
//             </thead>
//             <tbody>
//               {assets.length > 0 ? (
//                 assets.map((asset, index) => (
//                   <tr key={asset._id} className="border-b cursor-pointer hover:bg-gray-100"
//                   onClick={() => navigate("/assets")} // Navigate to Asset List
//                 >
//                     <td className="py-2 px-4">{index + 1}</td>
//                     <td className="py-2 px-4">{asset.equipmentName}</td>
//                     <td className="py-2 px-4">{asset.assetNo}</td>
//                     <td className="py-2 px-4">{asset.department}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="4" className="py-4 text-center text-gray-500">
//                     No assets found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="mt-8 flex space-x-4">
//         <Link to="/add" className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
//           <PlusCircle size={20} /> Add Asset
//         </Link>
//         <Link to="/assets" className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
//           <List size={20} /> View All Assets
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { PlusCircle, List } from "lucide-react";

const Dashboard = () => {
  const [assets, setAssets] = useState([]);
  const [totalAssets, setTotalAssets] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all assets
    const fetchAssets = async () => {
      try {
        const response = await axios.get("https://asset-management-backend-vegp.onrender.com/api/assets");
        setAssets(response.data.assets.slice(0, 5)); // Show only recent 5
        setTotalAssets(response.data.assets.length);
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    fetchAssets();
  }, []);

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      {/* Header */}
      <h1 className="text-2xl md:text-3xl font-bold text-blue-700">Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div className="bg-white shadow-lg p-4 rounded-xl border-l-4 border-blue-600">
          <h2 className="text-lg font-semibold">Total Assets</h2>
          <p className="text-2xl font-bold mt-2">{totalAssets}</p>
        </div>
      </div>

      {/* Recent Assets */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-700">Recent Assets</h2>
        <div className="bg-white shadow-md rounded-lg mt-4 overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse border border-gray-300 text-sm md:text-base">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-2 px-4 text-left">#</th>
                <th className="py-2 px-4 text-left">Equipment Name</th>
                <th className="py-2 px-4 text-left">Asset No</th>
                <th className="py-2 px-4 text-left">Department</th>
              </tr>
            </thead>
            <tbody>
              {assets.length > 0 ? (
                assets.map((asset, index) => (
                  <tr 
                    key={asset._id} 
                    className="border-b cursor-pointer hover:bg-gray-100 transition duration-150"
                    onClick={() => navigate("/assets")} // Navigate to Asset List
                  >
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{asset.equipmentName}</td>
                    <td className="py-2 px-4">{asset.assetNo}</td>
                    <td className="py-2 px-4">{asset.department}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500">
                    No assets found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 flex flex-col md:flex-row gap-4">
        <Link to="/add" className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 justify-center md:w-auto">
          <PlusCircle size={20} /> Add Asset
        </Link>
        <Link to="/assets" className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 justify-center md:w-auto">
          <List size={20} /> View All Assets
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
