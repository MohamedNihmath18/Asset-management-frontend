 

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

const EditAsset = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    equipmentName: "",
    assetNo: "",
    serialNumber: "",
    model: "",
    manufacturerName: "",
    department: "",
    warrantyPeriod: "",
    warrantyStartDate: "",
    ppmFrequency: "",
    ppmStartDate: "",
    ppmEndDate: "",
    supplierName: "",
    supplierContactNo: "",
    poNo: "",
    doNo: "",
    invoiceNo: "",
    totalAmount: "",
    lifespan: "",
    drInchargeName: "",
    purposeOfEquipment: "",
    requestedBy: "",
    testingCommissioning: null,
    serviceReports: null,
    ppm: null,
    license: null,
    contract: null,
  });

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const response = await axios.get(`https://asset-management-backend-vegp.onrender.com/api/assets/${id}`);
        const assetData = response.data.asset;

        // ✅ Convert warrantyStartDate to "YYYY-MM-DD" format
        // const formattedDate = assetData.warrantyStartDate
        //   ? new Date(assetData.warrantyStartDate).toISOString().split("T")[0]
        //   : "";

        setFormData({
          ...assetData,
          warrantyStartDate: assetData.warrantyStartDate ? new Date(assetData.warrantyStartDate).toISOString().split("T")[0] : "",
          ppmStartDate: assetData.ppmStartDate ? new Date(assetData.ppmStartDate).toISOString().split("T")[0] : "",
          ppmEndDate: assetData.ppmEndDate ? new Date(assetData.ppmEndDate).toISOString().split("T")[0] : "",
          invoiceNo: assetData.invoiceNo || "",
          equipmentType: assetData.equipmentType || "critical",
          poNo: assetData.poNo || "",
          doNo: assetData.doNo || "",
          lifespan: assetData.lifespan || "",
          requestedBy: assetData.requestedBy || "",
        });
      } catch (error) {
        console.error("Error fetching asset:", error);
      }
    };

    fetchAsset();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://asset-management-backend-vegp.onrender.com/api/assets/${id}`, formData);
      alert("Asset updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating asset:", error);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
        <ArrowLeft size={20} /> Back to Asset List
      </button>

      <h1 className="text-2xl md:text-3xl font-bold text-blue-700 mt-4">Edit Asset</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-6 bg-white shadow-md p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ["Equipment Name", "equipmentName"],
            ["Asset No", "assetNo"],
            ["Serial Number", "serialNumber"],
            ["Model", "model"],
            ["Manufacturer", "manufacturerName"],
            ["Supplier", "supplierName"],
            ["Supplier Contact No", "supplierContactNo"],
            ["Department", "department"],
            ["Warranty Period (Years)", "warrantyPeriod"],
            ["Warranty Start Date", "warrantyStartDate", "date"],
            ["PPM Frequency", "ppmFrequency"],
            ["PPM Start Date", "ppmStartDate", "date"],
            ["PPM End Date", "ppmEndDate", "date"],
            ["Total Amount", "totalAmount", "number"],
            ["Doctor In-Charge", "drInchargeName"],
            ["Purpose of Equipment", "purposeOfEquipment"],
            ["PO No", "poNo"],
            ["DO No", "doNo"],
            ["Invoice No", "invoiceNo"],
            ["Lifespan (Years)", "lifespan", "number"],
            ["Requested By", "requestedBy"],
          ].map(([label, name, type = "text"]) => (
            <div key={name}>
              <label className="block text-gray-700">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
                required
              />
            </div>
          ))}

           {/* Equipment Type */}
           <div>
            <label className="block text-gray-700">Equipment Type</label>
            <select
              name="equipmentType"
              value={formData.equipmentType}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
              required
            >
              <option value="critical">Critical</option>
              <option value="non-critical">Non-Critical</option>
            </select>
          </div>
          
          {/* File Uploads */}
          {[
            ["Testing & Commissioning", "testingCommissioning"],
            ["Service Reports", "serviceReports"],
            ["PPM", "ppm"],
            ["License", "license"],
            ["Contract", "contract"],
          ].map(([label, name]) => (
            <div key={name}>
              <label className="block text-gray-700">{label}</label>
              <input
                type="file"
                name={name}
                onChange={(e) => setFormData({ ...formData, [name]: e.target.files[0] })}
                className="w-full border p-2 rounded-md"
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button type="submit" className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-800">
          Update Asset
        </button>
      </form>
    </div>
  );
};

export default EditAsset;

