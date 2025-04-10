

import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Download } from "lucide-react";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";

const AssetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const pdfRef = useRef(); // Reference for PDF download

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const response = await axios.get(`https://asset-management-backend-vegp.onrender.com/api/assets/${id}`);
        setAsset(response.data.asset);
      } catch (error) {
        console.error("Error fetching asset details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAsset();
  }, [id]);

  const downloadPDF = async () => {
    const element = pdfRef.current;

    try {
      const imgData = await domtoimage.toPng(element);
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const imgHeight = (pdf.internal.pageSize.getHeight() * imgWidth) / pdf.internal.pageSize.getWidth();

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save(`Asset_Details_${asset.assetNo}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  if (loading) return <p className="text-center mt-6 text-gray-600">Loading asset details...</p>;
  if (!asset) return <p className="text-center mt-6 text-red-500">Asset not found!</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
      >
        <ArrowLeft size={20} /> Back to Asset List
      </button>

      {/* Asset Details */}
      <div ref={pdfRef} className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-4 text-center">{asset.equipmentName || "Unknown Equipment"}</h1>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-left">
            <tbody>
              {[
                ["Asset No", asset.assetNo],
                ["Serial Number", asset.serialNumber],
                ["Model", asset.model],
                ["Manufacturer", asset.manufacturerName],
                ["Supplier", asset.supplierName],
                ["Supplier Contact", asset.supplierContactNo],
                ["PO No", asset.poNo],
                ["DO No", asset.doNo],
                ["Department", asset.department],
                ["Warranty Period", asset.warrantyPeriod ? `${asset.warrantyPeriod} years` : "N/A"],
                ["Warranty Start Date", asset.warrantyStartDate ? new Date(asset.warrantyStartDate).toLocaleDateString() : "N/A"],
                ["PPM Frequency", asset.ppmFrequency],
                ["PPM Start Date", asset.ppmStartDate ? new Date(asset.ppmStartDate).toLocaleDateString() : "N/A"],
                ["PPM End Date", asset.ppmEndDate ? new Date(asset.ppmEndDate).toLocaleDateString() : "N/A"],
                ["Invoice No", asset.invoiceNo],
                ["Equipment Type", asset.equipmentType === "critical" ? "Critical" : "Non-Critical"],
                ["Total Amount", asset.totalAmount ? `$RM{asset.totalAmount}` : "N/A"],
                ["Lifespan", asset.lifespan],
                ["Doctor In-Charge", asset.drInchargeName],
                ["Purpose of Equipment", asset.purposeOfEquipment],
                ["Requested By", asset.requestedBy],
              ].map(([label, value], index) => (
                <tr key={label} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="border border-gray-300 px-4 py-2 font-semibold w-1/3">{label}</td>
                  <td className="border border-gray-300 px-4 py-2">{value || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Documents Section */}
        <h2 className="text-xl font-semibold mt-6">📂 Attached Documents</h2>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(asset.documents || {}).map(([key, value]) =>
            value ? (
              <a
                key={key}
                href={`https://asset-management-backend-vegp.onrender.com/${value}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline bg-gray-100 px-3 py-2 rounded-md"
              >
                {key.toUpperCase()}
              </a>
            ) : (
              <p key={key} className="text-gray-500">{key.toUpperCase()}: Not Uploaded</p>
            )
          )}
        </div>
      </div>

      {/* Buttons Section */}
      <div className="mt-6 flex flex-col md:flex-row gap-4">
        <button
          onClick={downloadPDF}
          className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-800 flex items-center gap-2 w-full md:w-auto"
        >
          <Download size={18} /> Download PDF
        </button>

        <button
          onClick={() => navigate(`/edit-asset/${id}`)}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-800 w-full md:w-auto"
        >
          Edit Asset
        </button>
      </div>
    </div>
  );
};

export default AssetDetails;
