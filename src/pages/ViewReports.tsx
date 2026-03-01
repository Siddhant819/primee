import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, Eye, ArrowLeft, FileText, Calendar, User, Building2 } from "lucide-react";
import { toast } from "sonner";
import { API_BASE_URL } from "@/api/config";

const ViewReports = () => {
  const navigate = useNavigate();
  const [patientId, setPatientId] = useState("");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!patientId.trim()) {
      toast.error("Please enter your Patient ID");
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_BASE_URL}/reports/patient/${patientId}`, {
        headers: { Authorization: `Bearer ${token || ''}` },
      });

      const data = await response.json();

      if (data.success) {
        setReports(data.reports);
        toast.success(`Found ${data.reports.length} report(s)`);
      } else {
        setReports([]);
        toast.error(data.message || "No reports found");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = (imageUrl: string, fileName: string) => {
    const fullUrl = `${API_BASE_URL.replace('/api', '')}${imageUrl}`;
    const a = document.createElement('a');
    a.href = fullUrl;
    a.download = fileName;
    a.click();
    toast.success("Report download started");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-slate-900">My Medical Reports</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Search Your Reports</h2>
          <form onSubmit={handleSearch} className="flex gap-3">
            <input
              type="text"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value.toUpperCase())}
              placeholder="Enter your Patient ID (e.g., PT00001)"
              className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-all disabled:opacity-50"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </form>
        </div>

        {/* Reports List */}
        {searched && (
          <div>
            {reports.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <FileText size={48} className="mx-auto text-slate-400 mb-4" />
                <p className="text-slate-600 text-lg">No reports found for this Patient ID</p>
                <p className="text-slate-500 text-sm mt-2">Please verify your Patient ID and try again</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reports.map((report: any) => (
                  <div
                    key={report._id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900">
                            {report.reportType}
                          </h3>
                          <p className="text-slate-600 text-sm mt-1">
                            {report.description || "No description provided"}
                          </p>
                        </div>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                          {report.reportType}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div>
                          <p className="text-sm text-slate-600 flex items-center gap-2">
                            <Calendar size={16} />
                            Report Date
                          </p>
                          <p className="font-semibold text-slate-900">
                            {new Date(report.reportDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600 flex items-center gap-2">
                            <Building2 size={16} />
                            Department
                          </p>
                          <p className="font-semibold text-slate-900">{report.department}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600 flex items-center gap-2">
                            <User size={16} />
                            Doctor
                          </p>
                          <p className="font-semibold text-slate-900">{report.doctorName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Upload Date</p>
                          <p className="font-semibold text-slate-900">
                            {new Date(report.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => setSelectedReport(report)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                        >
                          <Eye size={18} />
                          View Report
                        </button>
                        <button
                          onClick={() => downloadReport(report.reportImageUrl, `Report-${report.reportType}-${Date.now()}.jpg`)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
                        >
                          <Download size={18} />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Report Preview Modal */}
        {selectedReport && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900">
                  {selectedReport.reportType} Report
                </h2>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="text-slate-600 hover:text-slate-900 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="bg-slate-100 rounded-lg p-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600">Patient Name</p>
                    <p className="font-semibold">{selectedReport.patientName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Department</p>
                    <p className="font-semibold">{selectedReport.department}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Doctor Name</p>
                    <p className="font-semibold">{selectedReport.doctorName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Report Date</p>
                    <p className="font-semibold">
                      {new Date(selectedReport.reportDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-slate-600 mb-2">Report Image</p>
                  <img
                    src={`${API_BASE_URL.replace('/api', '')}${selectedReport.reportImageUrl}`}
                    alt={selectedReport.reportType}
                    className="w-full rounded-lg border border-slate-200"
                  />
                </div>

                {selectedReport.description && (
                  <div>
                    <p className="text-sm text-slate-600 mb-2">Description</p>
                    <p className="text-slate-900 p-4 bg-slate-50 rounded-lg">
                      {selectedReport.description}
                    </p>
                  </div>
                )}

                <div className="flex gap-3 pt-4 border-t border-slate-200">
                  <button
                    onClick={() => downloadReport(selectedReport.reportImageUrl, `Report-${selectedReport.reportType}-${Date.now()}.jpg`)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    <Download size={18} />
                    Download Report
                  </button>
                  <button
                    onClick={() => setSelectedReport(null)}
                    className="flex-1 px-4 py-2 bg-slate-300 text-slate-900 rounded-lg hover:bg-slate-400"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewReports;