
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Trash2, Eye } from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
 

const AssetList = () => {
  const navigate = useNavigate();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("equipmentName"); // Default search by Equipment Name

  // Fetch Assets from Backend
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get("https://asset-management-backend-vegp.onrender.com/api/assets");
        setAssets(Array.isArray(response.data.assets) ? response.data.assets : []);
      } catch (error) {
        console.error("Error fetching assets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAssets();
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this asset?")) return;

    try {
      await axios.delete(`https://asset-management-backend-vegp.onrender.com/api/assets/${id}`);
      setAssets(assets.filter((asset) => asset._id !== id));
      alert("Asset deleted successfully!");
    } catch (error) {
      console.error("Error deleting asset:", error);
      alert("Failed to delete asset");
    }
  };

  // Export to Excel
  const handleExportToExcel = () => {
    const exportData = filteredAssets.map(({ equipmentName, assetNo, department, equipmentType }) => ({
      "Equipment Name": equipmentName,
      "Asset No": assetNo,
      "Department": department,
      "Equipment Type": equipmentType || "N/A",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Assets");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "Asset_List.xlsx");
  };

  // Filtered assets based on search term and selected field
  // const filteredAssets = assets.filter((asset) =>
  //   asset[searchField]?.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const filteredAssets = assets.filter((asset) =>
    asset[searchField]?.toString().toLowerCase().includes(searchTerm.toLowerCase()) // ✅ Convert to string
  );
  

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-3">
       
        <h1 className="text-2xl md:text-3xl font-bold text-blue-700">Asset List</h1>
        <button
          onClick={handleExportToExcel}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-150"
        >
          Export to Excel
        </button>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <select
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-full md:w-auto"
          >
            <option value="equipmentName">Equipment Name</option>
            <option value="assetNo">Asset No</option>
            <option value="department">Department</option>
            <option value="equipmentType">Equipment Type</option>
          </select>
          <input
            type="text"
            placeholder={`Search by ${searchField.replace(/([A-Z])/g, " $1")}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-full md:w-auto"
          />
        </div>
      </div>

      {loading ? (
        <p className="text-center mt-6 text-gray-600">Loading assets...</p>
      ) : (
        <div className="mt-6 bg-white shadow-md p-4 rounded-lg overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Equipment Name</th>
                <th className="border p-2">Asset No</th>
                <th className="border p-2">Department</th>
                <th className="border p-2">Equipment Type</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.length > 0 ? (
                filteredAssets.map((asset) => (
                  <tr key={asset._id} className="text-center hover:bg-gray-50">
                    <td className="border p-2">{asset.equipmentName}</td>
                    <td className="border p-2">{asset.assetNo}</td>
                    <td className="border p-2">{asset.department}</td>
                    <td className="border p-2">{asset.equipmentType || "N/A"}</td>
                    <td className="border p-2 flex items-center justify-center gap-2 md:gap-4">
                      <button
                        onClick={() => navigate(`/asset/${asset._id}`)}
                        className="text-blue-600 hover:text-blue-800 transition duration-150"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(asset._id)}
                        className="text-red-600 hover:text-red-800 transition duration-150"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-gray-500">
                    No assets found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AssetList;
