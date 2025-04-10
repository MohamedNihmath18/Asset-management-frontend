 

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
 

const AddAsset = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    equipmentName: "",
    assetNo: "",
    serialNumber: "",
    model: "",
    manufacturerName: "",
    department: "",
    warrantyPeriod: "",
    warrantyStartDate: "",
    warrantyEndDate:"",
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
    equipmentType: "critical",
    testingCommissioning: null,
    serviceReports: null,
    ppm: null,
    license: null,
    contract: null,
  });

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle File Uploads
  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      await axios.post("https://asset-management-backend-vegp.onrender.com/api/assets/create", data);
      alert("Asset added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding asset:", error);
      alert("Failed to add asset");
    } finally {
      setLoading(false);
    }
  };

  return (
     
      
    <div className="p-6 max-w-4xl mx-auto">
     
      {/* Header */}
      <h1 className="text-3xl font-bold text-blue-700 text-center">Add New Asset</h1>

      <form className="mt-6 bg-white shadow-md p-6 rounded-lg" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Equipment Details */}
          {[
            ["Equipment Name", "equipmentName"],
            ["Asset No", "assetNo"],
            ["Serial Number", "serialNumber"],
            ["Model", "model"],
            ["Manufacturer Name", "manufacturerName"],
            ["Department", "department"],
            ["Warranty Period", "warrantyPeriod"],
            ["Warranty Start Date", "warrantyStartDate", "date"],
            ["Warranty End Date", "warrantyEndDate", "date"],
            ["PPM Frequency", "ppmFrequency"],
            ["PPM Start Date", "ppmStartDate", "date"],
            ["PPM End Date", "ppmEndDate", "date"],
            ["Supplier Name", "supplierName"],
            ["Supplier Contact.No", "supplierContactNo"],
            ["PO.No", "poNo"],
            ["DO.No", "doNo"],
            ["Invoice No", "invoiceNo"],
            ["Total Amount", "totalAmount", "number"],
            ["Life Span", "lifespan"],
            ["Dr Incharge Name", "drInchargeName"],
            ["Purpose Of Equipment", "purposeOfEquipment"],
            ["Requested By", "requestedBy"],
          ].map(([label, name, type = "text"]) => (
            <div key={name}>
              <label className="block font-medium">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full border p-2 rounded-md focus:ring focus:ring-blue-200"
                required
              />
            </div>
          ))}

          {/* Equipment Type */}
        <div>
            <label className="block font-medium">Equipment Type</label>
            <select
              name="equipmentType"
              value={formData.equipmentType}
              onChange={handleChange}
              className="w-full border p-2 rounded-md focus:ring focus:ring-blue-200"
              required
            >
              <option value="critical">Critical</option>
              <option value="non-critical">Non-Critical</option>
            </select>
          </div>
        </div>

        

        {/* File Uploads */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Upload Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {[
              ["Testing & Commissioning", "testingCommissioning"],
              ["Service Reports", "serviceReports"],
              ["PPM", "ppm"],
              ["License", "license"],
              ["Contract", "contract"],
            ].map(([label, name]) => (
              <div key={name}>
                <label className="block font-medium">{label}</label>
                <input
                  type="file"
                  name={name}
                  onChange={handleFileChange}
                  className="w-full border p-2 rounded-md focus:ring focus:ring-blue-200"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-800"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : "Add Asset"}
        </button>
      </form>
    </div>
     
  );
};

export default AddAsset;
