import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Trash2, Eye } from "lucide-react";

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

  // Filtered assets based on search term and selected field
  const filteredAssets = assets.filter((asset) =>
    asset[searchField]?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-blue-700">Asset List</h1>
        <div className="flex gap-2">
          <select
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg"
          >
            <option value="equipmentName">Equipment Name</option>
            <option value="assetNo">Asset No</option>
            <option value="department">Department</option>
          </select>
          <input
            type="text"
            placeholder={`Search by ${searchField.replace(/([A-Z])/g, " $1")}`} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg"
          />
        </div>
      </div>
      
      {loading ? (
        <p className="text-center mt-6 text-gray-600">Loading assets...</p>
      ) : (
        <div className="mt-6 bg-white shadow-md p-4 rounded-lg">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Equipment Name</th>
                <th className="border p-2">Asset No</th>
                <th className="border p-2">Department</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.length > 0 ? (
                filteredAssets.map((asset) => (
                  <tr key={asset._id} className="text-center">
                    <td className="border p-2">{asset.equipmentName}</td>
                    <td className="border p-2">{asset.assetNo}</td>
                    <td className="border p-2">{asset.department}</td>
                    <td className="border p-2 flex items-center justify-center gap-4">
                      <button
                        onClick={() => navigate(`/asset/${asset._id}`)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(asset._id)}
                        className="text-red-600 hover:text-red-800"
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
