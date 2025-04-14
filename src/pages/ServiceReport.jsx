import React, { useEffect, useState } from "react";
import axios from "axios";

const ServiceReport = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/service-reports")
      .then((res) => setReports(res.data))
      .catch((err) => console.error("Error fetching reports:", err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Service Reports</h1>
      {reports.length === 0 ? (
        <p>No service reports found.</p>
      ) : (
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">Equipment Name</th>
              <th className="px-4 py-2 border">Asset No</th>
              <th className="px-4 py-2 border">Department</th>
              <th className="px-4 py-2 border">Service Report</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report._id} className="border-t">
                <td className="px-4 py-2 border">{report.equipmentName}</td>
                <td className="px-4 py-2 border">{report.assetNo}</td>
                <td className="px-4 py-2 border">{report.department}</td>
                <td className="px-4 py-2 border text-blue-600">
                  {report.documents?.serviceReports ? (
                    <a
                      href={`http://localhost:5000/${report.documents.serviceReports}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      View Report
                    </a>
                  ) : (
                    "Not uploaded"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ServiceReport;
