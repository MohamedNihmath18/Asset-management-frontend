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
    <div className="p-6">
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
        <ArrowLeft size={20} /> Back to Asset List
      </button>

      {/* Asset Details */}
      <div ref={pdfRef} className="mt-6 bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">{asset.equipmentName || "Unknown Equipment"}</h1>
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
              ["Invoice No 1", asset.invoiceNo1],
              ["Invoice No 2", asset.invoiceNo2],
              ["Invoice No 3", asset.invoiceNo3],
              ["Total Amount", asset.totalAmount ? `$${asset.totalAmount}` : "N/A"],
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

        {/* Documents Section */}
        <h2 className="text-xl font-semibold mt-6">📂 Attached Documents</h2>
        <div className="mt-2">
          {Object.entries(asset.documents || {}).map(([key, value]) =>
            value ? (
              <p key={key}>
                <a href={`https://asset-management-backend-vegp.onrender.com/${value}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {key.toUpperCase()}
                </a>
              </p>
            ) : (
              <p key={key} className="text-gray-500">{key.toUpperCase()}: Not Uploaded</p>
            )
          )}
        </div>
      </div>

      {/* Buttons Section */}
      <div className="mt-6 flex gap-4">
        <button onClick={downloadPDF} className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-800 flex items-center gap-2">
          <Download size={18} /> Download PDF
        </button>
        
        <button onClick={() => navigate(`/edit-asset/${id}`)} className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-800">
          Edit Asset
        </button>
      </div>
    </div>
  );
};

export default AssetDetails;
