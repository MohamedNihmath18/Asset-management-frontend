import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const Warranty = () => {
  const [assets, setAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchExpiringWarranties = async () => {
      try {
        const response = await axios.get("https://asset-management-backend-vegp.onrender.com/api/assets");
        const allAssets = response.data.assets;

        const today = new Date();
        const oneMonthLater = new Date();
        oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

        const expiringAssets = allAssets.filter((asset) => {
          const warrantyEndDate = new Date(asset.warrantyEndDate);
          return warrantyEndDate >= today && warrantyEndDate <= oneMonthLater;
        });

        setAssets(expiringAssets);
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    fetchExpiringWarranties();
  }, []);

  const filteredAssets = assets.filter((asset) =>
    asset.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.assetNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 ml-64">
        <h1 className="text-2xl font-bold text-blue-700">Warranty Expiring in Next 30 Days</h1>
        <p className="text-gray-600 mt-2">List of assets whose warranty will expire in the next month.</p>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by Asset Name, Department, or Asset No..."
          className="w-full border p-2 mt-4 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Asset Table */}
        <div className="bg-white shadow-md rounded-lg mt-6 overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse border border-gray-300 text-sm md:text-base">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-2 px-4 text-left">#</th>
                <th className="py-2 px-4 text-left">Asset Name</th>
                <th className="py-2 px-4 text-left">Asset No</th>
                <th className="py-2 px-4 text-left">Department</th>
                <th className="py-2 px-4 text-left">Warranty Start Date</th>
                <th className="py-2 px-4 text-left">Warranty End Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.length > 0 ? (
                filteredAssets.map((asset, index) => (
                  <tr key={asset._id} className="border-b hover:bg-gray-100 transition duration-150">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{asset.equipmentName}</td>
                    <td className="py-2 px-4">{asset.assetNo}</td>
                    <td className="py-2 px-4">{asset.department}</td>
                    <td className="py-2 px-4">{new Date(asset.warrantyStartDate).toLocaleDateString()}</td>
                    <td className="py-2 px-4 text-red-500 font-semibold">{new Date(asset.warrantyEndDate).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-4 text-center text-gray-500">
                    No upcoming warranty expirations
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Warranty;
