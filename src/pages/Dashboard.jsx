import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { PlusCircle, List } from "lucide-react";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const [assets, setAssets] = useState([]);
  const [totalAssets, setTotalAssets] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [departmentTotals, setDepartmentTotals] = useState({});
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get("https://asset-management-backend-vegp.onrender.com/api/assets");
        const fetchedAssets = response.data.assets;
        setAssets(fetchedAssets.slice(0, 5));
        setTotalAssets(fetchedAssets.length);

        const amount = fetchedAssets.reduce((acc, asset) => acc + (asset.totalAmount || 0), 0);
        setTotalAmount(amount);

        const totalsByDepartment = fetchedAssets.reduce((acc, asset) => {
          acc[asset.department] = (acc[asset.department] || 0) + (asset.totalAmount || 0);
          return acc;
        }, {});
        setDepartmentTotals(totalsByDepartment);
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    fetchAssets();
  }, []);

  const filteredAmount =
    selectedDepartment === "All" ? totalAmount : departmentTotals[selectedDepartment] || 0;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
       
      <Sidebar />
      

      {/* Main Dashboard */}
      <div className="ml-58 flex-1 p-4 mt-16">
        <h1 className="text-3xl font-bold text-blue-700">Dashboard</h1>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className="bg-white shadow-lg p-4 rounded-xl border-l-4 border-blue-600">
            <h2 className="text-lg font-semibold">Total Assets</h2>
            <p className="text-2xl font-bold mt-2">{totalAssets}</p>
          </div>
          <div className="bg-white shadow-lg p-4 rounded-xl border-l-4 border-green-600">
            <h2 className="text-lg font-semibold">Total Amount</h2>
            <p className="text-2xl font-bold mt-2">RM{totalAmount.toLocaleString()}</p>
          </div>
        </div>

        {/* Total Equipment Value by Department */}
        <div className="mt-8 bg-white shadow-lg p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">📊 Total Equipment Value by Department</h2>
          <div className="mt-4">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-full md:w-auto"
            >
              <option value="All">All Departments</option>
              {Object.keys(departmentTotals).map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <p className="text-2xl font-bold mt-4">RM{filteredAmount.toLocaleString()}</p>
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
                  <th className="py-2 px-4 text-left">Equipment Type</th>
                </tr>
              </thead>
              <tbody>
                {assets.length > 0 ? (
                  assets.map((asset, index) => (
                    <tr
                      key={asset._id}
                      className="border-b cursor-pointer hover:bg-gray-100 transition duration-150"
                      onClick={() => navigate("/assets")}
                    >
                      <td className="py-2 px-4">{index + 1}</td>
                      <td className="py-2 px-4">{asset.equipmentName}</td>
                      <td className="py-2 px-4">{asset.assetNo}</td>
                      <td className="py-2 px-4">{asset.department}</td>
                      <td className="py-2 px-4">
                        {asset.equipmentType ? asset.equipmentType : "Not Specified"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-4 text-center text-gray-500">
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
          <Link
            to="/add"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 justify-center md:w-auto"
          >
            <PlusCircle size={20} /> Add Asset
          </Link>
          <Link
            to="/assets"
            className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 justify-center md:w-auto"
          >
            <List size={20} /> View All Assets
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
