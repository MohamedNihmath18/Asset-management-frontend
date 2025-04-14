import React, { useEffect, useState } from "react";
import axios from "axios";

const ServiceReport = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/servicereports"); // API endpoint
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-4 text-center">
        Service Report
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow border border-gray-200 rounded-lg">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-2 border">Equipment Name</th>
              <th className="px-4 py-2 border">Asset No</th>
              <th className="px-4 py-2 border">Department</th>
              <th className="px-4 py-2 border">Service Report</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={index} className="text-center border-t">
                <td className="px-4 py-2 border">{report.equipmentName}</td>
                <td className="px-4 py-2 border">{report.assetNo}</td>
                <td className="px-4 py-2 border">{report.department}</td>
                <td className="px-4 py-2 border">
                  {report.serviceReport && (
                    <a
                      href={`http://localhost:5000/uploads/${report.serviceReport}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Report
                    </a>
                  )}
                </td>
              </tr>
            ))}

            {reports.length === 0 && (
              <tr>
                <td colSpan="4" className="text-gray-500 py-4">
                  No service reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceReport;
