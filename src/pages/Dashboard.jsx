import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { PlusCircle, List } from "lucide-react";

const Dashboard = () => {
  const [assets, setAssets] = useState([]);
  const [totalAssets, setTotalAssets] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [departmentTotals, setDepartmentTotals] = useState({});
  const [departmentCounts, setDepartmentCounts] = useState({}); // New state for equipment count per department
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get("https://asset-management-backend-vegp.onrender.com/api/assets");
        const fetchedAssets = response.data.assets;
        setAssets(fetchedAssets.slice(0, 5));
        setTotalAssets(fetchedAssets.length);

        // Calculate total equipment value
        const amount = fetchedAssets.reduce((acc, asset) => acc + (asset.totalAmount || 0), 0);
        setTotalAmount(amount);

        // Calculate total value and count of assets per department
        const totalsByDepartment = {};
        const countsByDepartment = {};

        fetchedAssets.forEach(asset => {
          const dept = asset.department || "Unknown";
          totalsByDepartment[dept] = (totalsByDepartment[dept] || 0) + (asset.totalAmount || 0);
          countsByDepartment[dept] = (countsByDepartment[dept] || 0) + 1; // Count occurrences
        });

        setDepartmentTotals(totalsByDepartment);
        setDepartmentCounts(countsByDepartment); // Store department-wise count
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    fetchAssets();
  }, []);

  const filteredAmount = selectedDepartment === "All"
    ? totalAmount
    : departmentTotals[selectedDepartment] || 0;

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
        <div className="bg-white shadow-lg p-4 rounded-xl border-l-4 border-green-600">
          <h2 className="text-lg font-semibold">Total Amount</h2>
          <p className="text-2xl font-bold mt-2">${totalAmount.toLocaleString()}</p>
        </div>
      </div>

      {/* Total Equipment Value and Count by Department */}
      <div className="mt-8 bg-white shadow-lg p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700">📊 Equipment Stats by Department</h2>
        <div className="mt-4">
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full md:w-auto"
          >
            <option value="All">All Departments</option>
            {Object.keys(departmentTotals).map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        {/* Display Department-wise Stats */}
        <div className="mt-4">
          {selectedDepartment === "All" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(departmentTotals).map(dept => (
                <div key={dept} className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-800">{dept}</h3>
                  <p className="text-gray-600">💰 Total Value: ${departmentTotals[dept].toLocaleString()}</p>
                  <p className="text-gray-600">🛠 Total Equipments: {departmentCounts[dept]}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800">{selectedDepartment}</h3>
              <p className="text-gray-600">💰 Total Value: ${filteredAmount.toLocaleString()}</p>
              <p className="text-gray-600">🛠 Total Equipments: {departmentCounts[selectedDepartment] || 0}</p>
            </div>
          )}
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
