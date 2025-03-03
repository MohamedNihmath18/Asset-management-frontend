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
    ppmFrequency: "",
    supplierName: "",
    supplierContactNo: "",
    poNo: "",
    doNo: "",
    invoiceNo1: "",
    invoiceNo2: "",
    invoiceNo3: "",
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
      await axios.post("http://localhost:5000/api/assets/create", data);
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
    <div className="p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-blue-700">Add New Asset</h1>

      <form className="mt-6 bg-white shadow-md p-6 rounded-lg" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Equipment Details */}
          <div>
            <label className="block font-medium">Equipment Name</label>
            <input type="text" name="equipmentName" value={formData.equipmentName} onChange={handleChange} className="input-box" required />
          </div>

          <div>
            <label className="block font-medium">Asset No</label>
            <input type="text" name="assetNo" value={formData.assetNo} onChange={handleChange} className="input-box" required />
          </div>

          <div>
            <label className="block font-medium">Serial Number</label>
            <input type="text" name="serialNumber" value={formData.serialNumber} onChange={handleChange} className="input-box" />
          </div>

          <div>
            <label className="block font-medium">Model</label>
            <input type="text" name="model" value={formData.model} onChange={handleChange} className="input-box" />
          </div>

          <div>
            <label className="block font-medium">Manufacturer Name</label>
            <input type="text" name="manufacturerName" value={formData.manufacturerName} onChange={handleChange} className="input-box" />
          </div>

          <div>
            <label className="block font-medium">Department</label>
            <input type="text" name="department" value={formData.department} onChange={handleChange} className="input-box" required />
          </div>
          
          <div>
            <label className="block font-medium">Warranty Period</label>
            <input type="text" name="warrantyPeriod" value={formData.warrantyPeriod} onChange={handleChange} className="input-box" />
          </div>

          <div>
            <label className="block font-medium">Warranty Start Date</label>
            <input type="date" name="warrantyStartDate" value={formData.warrantyStartDate} onChange={handleChange} className="input-box" />
          </div>

          <div>
            <label className="block font-medium">PPM Frequency</label>
            <input type="text" name="ppmFrequency" value={formData.ppmFrequency} onChange={handleChange} className="input-box" />
          </div>

          <div>
            <label className="block font-medium">Supplier Name</label>
            <input type="text" name="supplierName" value={formData.supplierName} onChange={handleChange} className="input-box" />
          </div>

          <div>
            <label className="block font-medium">Supplier Contact.No:</label>
            <input type="text" name="supplierContactNo" value={formData.supplierContactNo} onChange={handleChange} className="input-box" />
          </div>

          <div>
            <label className="block font-medium">PO.No</label>
            <input type="text" name="poNo" value={formData.poNo} onChange={handleChange} className="input-box" />
          </div>

          <div>
            <label className="block font-medium">DO.No</label>
            <input type="text" name="doNo" value={formData.doNo} onChange={handleChange} className="input-box" />
          </div>

          <div>
            <label className="block font-medium">Invoice No1</label>
            <input type="text" name="invoiceNo1" value={formData.invoiceNo1} onChange={handleChange} className="input-box" />
          </div>

          <div>
            <label className="block font-medium">Invoice No2</label>
            <input type="text" name="invoiceNo2" value={formData.invoiceNo2} onChange={handleChange} className="input-box" />
          </div>

          <div>
            <label className="block font-medium">Invoice No3</label>
            <input type="text" name="invoiceNo3" value={formData.invoiceNo3} onChange={handleChange} className="input-box" />
          </div>

          <div>
            <label className="block font-medium">Total Amount</label>
            <input type="text" name="totalAmount" value={formData.totalAmount} onChange={handleChange} className="input-box" />
          </div>

          <div>
            <label className="block font-medium">Life Span</label>
            <input type="text" name="lifespan" value={formData.lifespan} onChange={handleChange} className="input-box" />
          </div>

          <div>
            <label className="block font-medium">Dr Incharge Name</label>
            <input type="text" name="drInchargeName" value={formData.drInchargeName} onChange={handleChange} className="input-box" />
          </div>

          <div>
            <label className="block font-medium">Purpose Of Equipment </label>
            <input type="text" name="purposeOfEquipment" value={formData.purposeOfEquipment} onChange={handleChange} className="input-box" />
          </div>

          <div>
            <label className="block font-medium">Requested By </label>
            <input type="text" name="requestedBy" value={formData.requestedBy} onChange={handleChange} className="input-box" />
          </div>



        </div>

        {/* File Uploads */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Upload Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <label className="block font-medium">Testing & Commissioning</label>
              <input type="file" name="testingCommissioning" onChange={handleFileChange} className="input-file" />
            </div>

            <div>
              <label className="block font-medium">Service Reports</label>
              <input type="file" name="serviceReports" onChange={handleFileChange} className="input-file" />
            </div>

            <div>
              <label className="block font-medium">PPM</label>
              <input type="file" name="ppm" onChange={handleFileChange} className="input-file" />
            </div>

            <div>
              <label className="block font-medium">License</label>
              <input type="file" name="license" onChange={handleFileChange} className="input-file" />
            </div>

            <div>
              <label className="block font-medium">Contract</label>
              <input type="file" name="contract" onChange={handleFileChange} className="input-file" />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          {loading ? <Loader2 className="animate-spin" size={20} /> : "Add Asset"}
        </button>
      </form>
    </div>
  );
};

export default AddAsset;
