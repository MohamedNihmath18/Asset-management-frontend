// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { ArrowLeft } from "lucide-react";

// const EditAsset = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     equipmentName: "",
//     assetNo: "",
//     serialNumber: "",
//     model: "",
//     manufacturerName: "",
//     department: "",
//     warrantyPeriod: "",
//     warrantyStartDate: "",
//     ppmFrequency: "",
//     supplierName: "",
//     supplierContactNo: "",
//     poNo: "",
//     doNo: "",
//     invoiceNo1: "",
//     invoiceNo2: "",
//     invoiceNo3: "",
//     totalAmount: "",
//     lifespan: "",
//     drInchargeName: "",
//     purposeOfEquipment: "",
//     requestedBy: "",
//     testingCommissioning: null,
//     serviceReports: null,
//     ppm: null,
//     license: null,
//     contract: null,
//   });

//   useEffect(() => {
//     const fetchAsset = async () => {
//       try {
//         const response = await axios.get(`https://asset-management-backend-vegp.onrender.com/api/assets/${id}`);
//         const assetData = response.data.asset;

//         // ✅ Convert warrantyStartDate to "YYYY-MM-DD" format
//         const formattedDate = assetData.warrantyStartDate
//           ? new Date(assetData.warrantyStartDate).toISOString().split("T")[0]
//           : "";

//         // Ensure missing fields are populated with default values
//         setFormData((prevData) => ({
//           ...prevData,
//           ...assetData,
//           warrantyStartDate: formattedDate,
//           testingCommissioning: assetData.testingCommissioning || null,
//           serviceReports: assetData.serviceReports || null,
//           ppm: assetData.ppm || null,
//           license: assetData.license || null,
//           contract: assetData.contract || null,
//           poNo: assetData.poNo || "",
//           doNo: assetData.doNo || "",
//           invoiceNo1: assetData.invoiceNo1 || "",
//           invoiceNo2: assetData.invoiceNo2 || "",
//           invoiceNo3: assetData.invoiceNo3 || "",
//           lifespan: assetData.lifespan || "",
//           requestedBy: assetData.requestedBy || "",
//         }));
//       } catch (error) {
//         console.error("Error fetching asset:", error);
//       }
//     };

//     fetchAsset();
//   }, [id]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`https://asset-management-backend-vegp.onrender.com/api/assets/${id}`, formData);
//       alert("Asset updated successfully!");
//       navigate("/");
//     } catch (error) {
//       console.error("Error updating asset:", error);
//     }
//   };

//   return (
//     <div className="p-6">
//       <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
//         <ArrowLeft size={20} /> Back to Asset List
//       </button>

//       <h1 className="text-2xl font-bold text-blue-700 mt-4">Edit Asset</h1>

//       <form onSubmit={handleSubmit} className="mt-6 bg-white shadow-md p-6 rounded-lg">
//   <div className="grid grid-cols-2 gap-4">
//     <div>
//       <label className="block text-gray-700">Equipment Name</label>
//       <input type="text" name="equipmentName" value={formData.equipmentName} onChange={handleChange}
//         className="w-full border p-2 rounded-md" required />
//     </div>

//     <div>
//       <label className="block text-gray-700">Asset No</label>
//       <input type="text" name="assetNo" value={formData.assetNo} onChange={handleChange}
//         className="w-full border p-2 rounded-md" required />
//     </div>

//     <div>
//       <label className="block text-gray-700">Serial Number</label>
//       <input type="text" name="serialNumber" value={formData.serialNumber} onChange={handleChange}
//         className="w-full border p-2 rounded-md" required />
//     </div>

//     <div>
//       <label className="block text-gray-700">Model</label>
//       <input type="text" name="model" value={formData.model} onChange={handleChange}
//         className="w-full border p-2 rounded-md" required />
//     </div>

//     <div>
//       <label className="block text-gray-700">Manufacturer</label>
//       <input type="text" name="manufacturerName" value={formData.manufacturerName} onChange={handleChange}
//         className="w-full border p-2 rounded-md" required />
//     </div>

//     <div>
//       <label className="block text-gray-700">Supplier</label>
//       <input type="text" name="supplierName" value={formData.supplierName} onChange={handleChange}
//         className="w-full border p-2 rounded-md" required />
//     </div>

//     <div>
//       <label className="block text-gray-700">Supplier Contact No</label>
//       <input type="text" name="supplierContactNo" value={formData.supplierContactNo} onChange={handleChange}
//         className="w-full border p-2 rounded-md" required />
//     </div>

//     <div>
//       <label className="block text-gray-700">Department</label>
//       <input type="text" name="department" value={formData.department} onChange={handleChange}
//         className="w-full border p-2 rounded-md" required />
//     </div>

//     <div>
//       <label className="block text-gray-700">Warranty Period (Years)</label>
//       <input type="number" name="warrantyPeriod" value={formData.warrantyPeriod} onChange={handleChange}
//         className="w-full border p-2 rounded-md" required />
//     </div>

//     <div>
//       <label className="block text-gray-700">Warranty Start Date</label>
//       <input type="date" name="warrantyStartDate" value={formData.warrantyStartDate} onChange={handleChange}
//         className="w-full border p-2 rounded-md" required />
//     </div>

//     <div>
//       <label className="block text-gray-700">PPM Frequency</label>
//       <input type="text" name="ppmFrequency" value={formData.ppmFrequency} onChange={handleChange}
//         className="w-full border p-2 rounded-md" required />
//     </div>

//     <div>
//       <label className="block text-gray-700">Total Amount</label>
//       <input type="number" name="totalAmount" value={formData.totalAmount} onChange={handleChange}
//         className="w-full border p-2 rounded-md" required />
//     </div>

//     <div>
//       <label className="block text-gray-700">Doctor In-Charge</label>
//       <input type="text" name="drInchargeName" value={formData.drInchargeName} onChange={handleChange}
//         className="w-full border p-2 rounded-md" required />
//     </div>

//     <div>
//       <label className="block text-gray-700">Purpose of Equipment</label>
//       <input type="text" name="purposeOfEquipment" value={formData.purposeOfEquipment} onChange={handleChange}
//         className="w-full border p-2 rounded-md" required />
//     </div>

//     {/* Missing Fields Added Below */}

//     <div>
//       <label className="block text-gray-700">PO No</label>
//       <input type="text" name="poNo" value={formData.poNo} onChange={handleChange}
//         className="w-full border p-2 rounded-md" required />
//     </div>

//     <div>
//       <label className="block text-gray-700">DO No</label>
//       <input type="text" name="doNo" value={formData.doNo} onChange={handleChange}
//         className="w-full border p-2 rounded-md" required />
//     </div>

//     <div>
//       <label className="block text-gray-700">Invoice No 1</label>
//       <input type="text" name="invoiceNo1" value={formData.invoiceNo1} onChange={handleChange}
//         className="w-full border p-2 rounded-md" required />
//     </div>

//     <div>
//       <label className="block text-gray-700">Invoice No 2</label>
//       <input type="text" name="invoiceNo2" value={formData.invoiceNo2} onChange={handleChange}
//         className="w-full border p-2 rounded-md" />
//     </div>

//     <div>
//       <label className="block text-gray-700">Invoice No 3</label>
//       <input type="text" name="invoiceNo3" value={formData.invoiceNo3} onChange={handleChange}
//         className="w-full border p-2 rounded-md" />
//     </div>

//     <div>
//       <label className="block text-gray-700">Lifespan (Years)</label>
//       <input type="number" name="lifespan" value={formData.lifespan} onChange={handleChange}
//         className="w-full border p-2 rounded-md" required />
//     </div>

//     <div>
//       <label className="block text-gray-700">Requested By</label>
//       <input type="text" name="requestedBy" value={formData.requestedBy} onChange={handleChange}
//         className="w-full border p-2 rounded-md" required />
//     </div>
//   </div>

//   <button type="submit" className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-800">
//     Update Asset
//   </button>
// </form>

//     </div>
//   );
// };

// export default EditAsset;

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

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const response = await axios.get(`https://asset-management-backend-vegp.onrender.com/api/assets/${id}`);
        const assetData = response.data.asset;

        // ✅ Convert warrantyStartDate to "YYYY-MM-DD" format
        const formattedDate = assetData.warrantyStartDate
          ? new Date(assetData.warrantyStartDate).toISOString().split("T")[0]
          : "";

        setFormData({
          ...assetData,
          warrantyStartDate: formattedDate,
          poNo: assetData.poNo || "",
          doNo: assetData.doNo || "",
          invoiceNo1: assetData.invoiceNo1 || "",
          invoiceNo2: assetData.invoiceNo2 || "",
          invoiceNo3: assetData.invoiceNo3 || "",
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
            ["Total Amount", "totalAmount", "number"],
            ["Doctor In-Charge", "drInchargeName"],
            ["Purpose of Equipment", "purposeOfEquipment"],
            ["PO No", "poNo"],
            ["DO No", "doNo"],
            ["Invoice No 1", "invoiceNo1"],
            ["Invoice No 2", "invoiceNo2"],
            ["Invoice No 3", "invoiceNo3"],
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

