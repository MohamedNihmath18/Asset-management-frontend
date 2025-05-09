import React, { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";

const BulkUpload = () => {
  const [excelData, setExcelData] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = evt.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setExcelData(parsedData);
    };
    reader.readAsBinaryString(file);
  };

  const handleUpload = async () => {
    if (!excelData.length) return alert("No data to upload.");

    setUploading(true);
    try {
      const response = await axios.post(
        "https://asset-management-backend-vegp.onrender.com/api/assets/bulk-upload",
        { assets: excelData }
      );
      alert("Assets uploaded successfully!");
      setExcelData([]);
    } catch (error) {
      console.error("Error uploading assets:", error);
      alert("Upload failed. Please check console.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">📥 Bulk Upload Assets via Excel</h1>

      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        className="mb-4 border p-2 rounded w-full"
      />

      {excelData.length > 0 && (
        <div className="bg-white shadow p-4 rounded overflow-x-auto mb-4 max-h-96 overflow-y-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-blue-600 text-white">
                {Object.keys(excelData[0]).map((key) => (
                  <th key={key} className="px-3 py-2 border">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {excelData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  {Object.values(row).map((val, i) => (
                    <td key={i} className="px-3 py-2 border">
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!excelData.length || uploading}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        {uploading ? "Uploading..." : "Upload Assets"}
      </button>
    </div>
  );
};

export default BulkUpload;
