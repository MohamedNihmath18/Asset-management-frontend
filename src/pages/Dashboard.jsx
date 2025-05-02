
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { PlusCircle, List, BarChart3, CalendarCheck2 } from "lucide-react";


const Dashboard = () => {
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
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
        setAssets(fetchedAssets); // ✅ Store all assets
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

  useEffect(() => {
    if (selectedDepartment === "All") {
      setFilteredAssets([]);
    } else {
      setFilteredAssets(assets.filter(asset => asset.department === selectedDepartment));
    }
  }, [selectedDepartment, assets]);

  const filteredAmount =
    selectedDepartment === "All" ? totalAmount : departmentTotals[selectedDepartment] || 0;

  // 🔥 NEW: Department with Most Assets
  const departmentCounts = assets.reduce((acc, asset) => {
    acc[asset.department] = (acc[asset.department] || 0) + 1;
    return acc;
  }, {});
  const mostAssetsDept = Object.keys(departmentCounts).reduce((a, b) =>
    departmentCounts[a] > departmentCounts[b] ? a : b, ""
  );

   // Filter for upcoming warranty/ppm within 30 days
   const today = new Date();
   const nextMonth = new Date();
   nextMonth.setDate(today.getDate() + 30);
 
   const upcomingWarranty = assets.filter(a => {
     const end = new Date(a.warrantyEndDate);
     return end >= today && end <= nextMonth;
   });
 
   const upcomingPPM = assets.filter(a => {
     const end = new Date(a.ppmEndDate);
     return end >= today && end <= nextMonth;
   });

  return (
    <div className="flex min-h-screen">


      {/* Main Dashboard */}
      <div className="flex-1 p-4">
        <h1 className="text-3xl font-bold text-blue-700">Dashboard</h1>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className="bg-white shadow-lg p-4 rounded-xl border-l-4 border-blue-600">
            <h2 className="text-lg font-semibold">Total Assets</h2>
            <p className="text-2xl font-bold text-blue-600 mt-2">{totalAssets}</p>
          </div>
          <div className="bg-white shadow-lg p-4 rounded-xl border-l-4 border-green-600">
            <h2 className="text-lg font-semibold">Total Amount</h2>
            <p className="text-2xl font-bold text-green-600 mt-2">RM{totalAmount.toLocaleString()}</p>
          </div>
          <div className="bg-white shadow-lg p-4 rounded-xl border-l-4 border-purple-600">
            <h2 className="text-lg font-semibold">Most Assets Dept</h2>
            <p className="text-base mt-2 text-gray-700">{mostAssetsDept || "N/A"}</p>
            <p className="text-2xl font-bold text-purple-800 mt-1">
              {departmentCounts[mostAssetsDept] || 0} Assets
            </p>
          </div>
        </div>

         {/* 📆 Warranty / PPM Alerts */}
         <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="cursor-pointer bg-yellow-100 hover:bg-yellow-200 p-4 rounded-lg shadow flex justify-between items-center transition"
            onClick={() => navigate("/warranty")}
          >
            <div>
              <h2 className="text-lg font-semibold text-yellow-800">Warranty Ending Soon</h2>
              <p className="text-sm text-gray-600">{upcomingWarranty.length} assets expiring in next 30 days</p>
            </div>
            <CalendarCheck2 size={32} className="text-yellow-600" />
          </div>

          <div
            className="cursor-pointer bg-orange-100 hover:bg-orange-200 p-4 rounded-lg shadow flex justify-between items-center transition"
            onClick={() => navigate("/ppm")}
          >
            <div>
              <h2 className="text-lg font-semibold text-orange-800">PPM Ending Soon</h2>
              <p className="text-sm text-gray-600">{upcomingPPM.length} assets expiring in next 30 days</p>
            </div>
            <CalendarCheck2 size={32} className="text-orange-600" />
          </div>
        </div>


        {/* Total Equipment Value by Department */}
        <div className="mt-8 bg-white shadow-lg p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2 "><BarChart3 className="text-blue-700" size={22} /> Total Equipment Value by Department</h2>

          <div className="mt-4">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-full md:w-auto"
            >
              <option value="All">All Departments</option>
              {Object.keys(departmentTotals).map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {/* Total value & count */}
          <div className="flex flex-col md:flex-row justify-between mt-4 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg flex-1 shadow-sm">
              <p className="text-sm text-gray-600 font-medium">Total Equipment Value</p>
              <p className="text-2xl font-bold text-blue-800 mt-1">
                RM{filteredAmount.toLocaleString()}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg flex-1 shadow-sm">
              <p className="text-sm text-gray-600 font-medium">Number of Equipment</p>
              <p className="text-2xl font-bold text-green-800 mt-1">
                {selectedDepartment === "All"
                  ? assets.length
                  : assets.filter((a) => a.department === selectedDepartment).length}
              </p>
            </div>
          </div>

          {/* Assets List for Selected Department */}
          {filteredAssets.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700">
                Assets in {selectedDepartment} Department
              </h3>
              <div className="mt-2 overflow-x-auto bg-gray-50 rounded-md shadow-md">
                <table className="w-full min-w-[600px] border-collapse border border-gray-300 text-sm md:text-base">
                  <thead>
                    <tr className="bg-blue-600 text-white">
                      <th className="py-2 px-4 text-left">#</th>
                      <th className="py-2 px-4 text-left">Equipment Name</th>
                      <th className="py-2 px-4 text-left">Asset No</th>
                      <th className="py-2 px-4 text-left">Department</th>
                      <th className="py-2 px-4 text-left">Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAssets.map((asset, index) => (
                      <tr
                        key={asset._id}
                        className="border-b hover:bg-gray-100 cursor-pointer"
                        onClick={() => navigate("/assets")}
                      >
                        <td className="py-2 px-4">{index + 1}</td>
                        <td className="py-2 px-4">{asset.equipmentName}</td>
                        <td className="py-2 px-4">{asset.assetNo}</td>
                        <td className="py-2 px-4">{asset.department}</td>
                        <td className="py-2 px-4">RM{asset.totalAmount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
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
