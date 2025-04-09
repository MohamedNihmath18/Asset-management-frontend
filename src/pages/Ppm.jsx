import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const Ppm = () => {
  const [assets, setAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get("https://asset-management-backend-vegp.onrender.com/api/assets");
        const allAssets = response.data.assets;
        
        const today = new Date();
        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);

        const filteredAssets = allAssets.filter(asset => {
          const ppmEndDate = new Date(asset.ppmEndDate);
          return ppmEndDate >= today && ppmEndDate <= nextMonth;
        });

        setAssets(filteredAssets);
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    fetchAssets();
  }, []);

  const filteredResults = assets.filter(asset =>
    asset.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.assetNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 ml-64">
        <h1 className="text-2xl font-bold text-blue-700">PPM End Date</h1>
        <p className="text-gray-600">Assets whose PPM expires within 1 month.</p>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by Equipment Name, Asset No, or Department"
          className="mt-4 p-2 border rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Table */}
        <div className="mt-4 bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-2 px-4 text-left">#</th>
                <th className="py-2 px-4 text-left">Equipment Name</th>
                <th className="py-2 px-4 text-left">Asset No</th>
                <th className="py-2 px-4 text-left">Department</th>
                <th className="py-2 px-4 text-left">PPM Start Date</th>
                <th className="py-2 px-4 text-left">PPM End Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.length > 0 ? (
                filteredResults.map((asset, index) => (
                  <tr key={asset._id} className="border-b hover:bg-gray-100 transition">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{asset.equipmentName}</td>
                    <td className="py-2 px-4">{asset.assetNo}</td>
                    <td className="py-2 px-4">{asset.department}</td>
                    <td className="py-2 px-4">{new Date(asset.ppmStartDate).toLocaleDateString()}</td>
                    <td className="py-2 px-4 text-red-600">{new Date(asset.ppmEndDate).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-4 text-center text-gray-500">
                    No assets with PPM expiring soon
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

export default Ppm;
