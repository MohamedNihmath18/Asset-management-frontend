import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { PlusCircle, List } from "lucide-react";

const Dashboard = () => {
  const [assets, setAssets] = useState([]);
  const [totalAssets, setTotalAssets] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAssetNo, setFilterAssetNo] = useState("");
  const [sidebarTab, setSidebarTab] = useState("warranty");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get("https://asset-management-backend-vegp.onrender.com/api/assets");
        const fetchedAssets = response.data.assets;
        setAssets(fetchedAssets);
        setTotalAssets(fetchedAssets.length);
        setTotalAmount(fetchedAssets.reduce((acc, asset) => acc + (asset.totalAmount || 0), 0));
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    fetchAssets();
  }, []);

  // Filter assets whose warranty or PPM ends within 1 month
  const getExpiringAssets = () => {
    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(today.getMonth() + 1);

    return assets.filter(asset => {
      const warrantyEnd = asset.warrantyEndDate ? new Date(asset.warrantyEndDate) : null;
      const ppmEnd = asset.ppmEndDate ? new Date(asset.ppmEndDate) : null;

      return (warrantyEnd && warrantyEnd <= nextMonth) || (ppmEnd && ppmEnd <= nextMonth);
    });
  };

  // Filtered asset list based on search query and asset number filter
  const filteredAssets = assets.filter(asset => {
    const matchesSearch = searchQuery
      ? asset.assetNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.equipmentName.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesFilter = filterAssetNo ? asset.assetNo === filterAssetNo : true;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-200 p-4 min-h-screen">
        <h2 className="text-lg font-semibold">Sidebar</h2>
        <ul>
          <li
            className={`cursor-pointer p-2 ${sidebarTab === "warranty" ? "bg-blue-500 text-white" : ""}`}
            onClick={() => setSidebarTab("warranty")}
          >
            Warranty & PPM End Dates
          </li>
          <li
            className={`cursor-pointer p-2 ${sidebarTab === "service" ? "bg-blue-500 text-white" : ""}`}
            onClick={() => setSidebarTab("service")}
          >
            Service Report
          </li>
        </ul>
      </div>

      {/* Main Dashboard Content */}
      <div className="p-4 w-3/4">
        <h1 className="text-2xl font-bold text-blue-700">Dashboard</h1>

        {/* Search & Filter */}
        <div className="mt-4 flex gap-4">
          <input
            type="text"
            placeholder="Search asset..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Filter by Asset No..."
            value={filterAssetNo}
            onChange={(e) => setFilterAssetNo(e.target.value)}
            className="border p-2 rounded-md"
          />
        </div>

        {/* Sidebar Tab Content */}
        {sidebarTab === "warranty" ? (
          <div className="mt-6 bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700">⚠️ Warranty & PPM Expiring Soon</h2>
            <table className="w-full border-collapse border border-gray-300 mt-4">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="py-2 px-4">Asset No</th>
                  <th className="py-2 px-4">Equipment Name</th>
                  <th className="py-2 px-4">Warranty End Date</th>
                  <th className="py-2 px-4">PPM End Date</th>
                </tr>
              </thead>
              <tbody>
                {getExpiringAssets().length > 0 ? (
                  getExpiringAssets().map((asset) => (
                    <tr key={asset._id} className="border-b">
                      <td className="py-2 px-4">{asset.assetNo}</td>
                      <td className="py-2 px-4">{asset.equipmentName}</td>
                      <td className="py-2 px-4">{asset.warrantyEndDate || "N/A"}</td>
                      <td className="py-2 px-4">{asset.ppmEndDate || "N/A"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-4 text-center text-gray-500">No expiring assets found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-6 bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700">📋 Service Report</h2>
            <p className="text-gray-500 mt-2">Coming Soon...</p>
          </div>
        )}

        {/* Recent Assets (filtered by search) */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700">Recent Assets</h2>
          <div className="bg-white shadow-md rounded-lg mt-4 overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="py-2 px-4">Asset No</th>
                  <th className="py-2 px-4">Equipment Name</th>
                  <th className="py-2 px-4">Warranty Start</th>
                  <th className="py-2 px-4">Warranty End</th>
                  <th className="py-2 px-4">PPM Start</th>
                  <th className="py-2 px-4">PPM End</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.length > 0 ? (
                  filteredAssets.map((asset) => (
                    <tr key={asset._id} className="border-b">
                      <td className="py-2 px-4">{asset.assetNo}</td>
                      <td className="py-2 px-4">{asset.equipmentName}</td>
                      <td className="py-2 px-4">{asset.warrantyStartDate || "N/A"}</td>
                      <td className="py-2 px-4">{asset.warrantyEndDate || "N/A"}</td>
                      <td className="py-2 px-4">{asset.ppmStartDate || "N/A"}</td>
                      <td className="py-2 px-4">{asset.ppmEndDate || "N/A"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-4 text-center text-gray-500">No matching assets</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
