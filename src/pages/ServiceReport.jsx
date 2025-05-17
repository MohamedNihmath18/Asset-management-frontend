import React, { useEffect, useState } from "react";
import axios from "axios";

const ServiceReport = () => {
  const [assets, setAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("https://asset-management-backend-vegp.onrender.com/api/assets");
        const allAssets = response.data.assets;

        // ✅ Filter only those that have service report document
        const withReports = allAssets.filter(asset => asset.documents?.serviceReports);
        setAssets(withReports);
      } catch (error) {
        console.error("Error fetching service reports:", error);
      }
    };

    fetchReports();
  }, []);

  const filteredAssets = assets.filter((asset) =>
    asset.equipmentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.assetNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold text-blue-700">Service Reports</h1>
      <p className="text-gray-600">View all uploaded service reports.</p>

      <input
        type="text"
        placeholder="Search by Equipment Name, Asset No, or Department"
        className="mt-4 p-2 border rounded w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="mt-4 bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">Equipment Name</th>
              <th className="py-2 px-4 text-left">Asset No</th>
              <th className="py-2 px-4 text-left">Department</th>
              <th className="py-2 px-4 text-left">Service Reports</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.length > 0 ? (
              filteredAssets.map((asset, index) => (
                <tr key={asset._id} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{asset.equipmentName}</td>
                  <td className="py-2 px-4">{asset.assetNo}</td>
                  <td className="py-2 px-4">{asset.department}</td>
                  {/* <td className="py-2 px-4">
                    {asset.documents?.serviceReports ? (
                      <a
                        href={asset.documents.serviceReports}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Report
                      </a>
                    ) : (
                      <span className="text-gray-400 italic">No Report</span>
                    )}
                  </td> */}

                  <td className="py-2 px-4 space-y-1">
  {Array.isArray(asset.documents?.serviceReports) && asset.documents.serviceReports.length > 0 ? (
    asset.documents.serviceReports.map((url, idx) => (
      <div key={idx}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          View Report {idx + 1}
        </a>
      </div>
    ))
  ) : (
    <span className="text-gray-400 italic">No Report</span>
  )}
</td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  No service reports found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceReport;
