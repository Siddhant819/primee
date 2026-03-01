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
  const [patients, setPatients] = useState<any[]>([]);
  const [showPatientList, setShowPatientList] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Get base server URL
  const SERVER_BASE_URL = API_BASE_URL.replace('/api', '');
  console.log('Server Base URL:', SERVER_BASE_URL);

  // Fetch all patients for autocomplete
  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_BASE_URL}/patients`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setPatients(data.patients || []);
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  // Handle search by patient ID or MongoDB ID
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!patientId.trim()) {
      toast.error("Please enter your Patient ID or select from the list");
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const token = localStorage.getItem("authToken");
      
      let mongoDbId = patientId;
      
      // If input looks like a patientId string (PT followed by numbers), find the MongoDB ID
      if (patientId.match(/^PT\d+$/i)) {
        const patient = patients.find(p => p.patientId === patientId.toUpperCase());
        if (patient) {
          mongoDbId = patient._id;
          console.log('Found patient, using MongoDB ID:', mongoDbId);
        } else {
          toast.error("Patient ID not found. Please select from the list or check the ID.");
          setLoading(false);
          setSearched(false);
          return;
        }
      }

      const response = await fetch(`${API_BASE_URL}/reports/patient/${mongoDbId}`, {
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

  // Handle patient selection from list
  const handleSelectPatient = (patient: any) => {
    setPatientId(patient.patientId);
    setShowPatientList(false);
    setTimeout(() => {
      const form = document.querySelector('form');
      if (form) {
        const event = new Event('submit', { bubbles: true });
        form.dispatchEvent(event);
      }
    }, 100);
  };

  // Download report - SIMPLE AND RELIABLE
  const downloadReport = async (imageUrl: string, fileName: string) => {
    setDownloading(true);
    try {
      // Construct full URL
      const fullUrl = `${SERVER_BASE_URL}${imageUrl}`;
      console.log('Starting download from:', fullUrl);

      // Method 1: Try direct download link
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Accept': 'image/*'
        }
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const blob = await response.blob();
      console.log('Blob received, size:', blob.size);

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName || 'report.jpg';
      link.style.display = 'none';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 100);

      toast.success("Report downloaded successfully!");
      console.log('Download completed');
    } catch (error) {
      console.error('Download error details:', error);
      
      // Fallback: Try opening in new window
      try {
        const fullUrl = `${SERVER_BASE_URL}${imageUrl}`;
        const newWindow = window.open(fullUrl, '_blank');
        if (newWindow) {
          toast.success("Opening report in new window...");
          console.log('Opened in new window');
        } else {
          toast.error("Failed to download. Please try opening in new window.");
        }
      } catch (fallbackError) {
        console.error('Fallback error:', fallbackError);
        toast.error("Failed to download report. Please try again.");
      }
    } finally {
      setDownloading(false);
    }
  };

  // Load patients on mount
  React.useEffect(() => {
    fetchPatients();
  }, []);

  // Filter patients based on input
  const filteredPatients = patients.filter(p =>
    p.patientId.toLowerCase().includes(patientId.toLowerCase()) ||
    p.fullName.toLowerCase().includes(patientId.toLowerCase())
  );

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
          <h1 className="text-2xl font-bold text-slate-900">View Your Reports</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Search Your Reports</h2>
          
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Patient ID or Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your Patient ID (e.g., PT00001) or name..."
                  value={patientId}
                  onChange={(e) => {
                    setPatientId(e.target.value);
                    setShowPatientList(e.target.value.length > 0);
                  }}
                  onFocus={() => setShowPatientList(true)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
                
                {/* Patient List Dropdown */}
                {showPatientList && filteredPatients.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                    {filteredPatients.map((patient) => (
                      <button
                        key={patient._id}
                        type="button"
                        onClick={() => handleSelectPatient(patient)}
                        className="w-full text-left px-4 py-2 hover:bg-slate-100 border-b border-slate-200 last:border-b-0 transition-colors"
                      >
                        <p className="font-semibold text-slate-900">{patient.patientId}</p>
                        <p className="text-sm text-slate-600">{patient.fullName}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-all disabled:opacity-50 w-full"
            >
              {loading ? "Searching..." : "Search Reports"}
            </button>
          </form>

          <p className="text-sm text-slate-600 mt-4">
            💡 Tip: You can either enter your Patient ID (PT00001) or your name to find your reports.
          </p>
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
                          disabled={downloading}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all disabled:opacity-50"
                        >
                          <Download size={18} />
                          {downloading ? "Downloading..." : "Download"}
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
                  <div className="relative bg-slate-200 rounded-lg overflow-hidden" style={{ minHeight: '300px' }}>
                    <img
                      src={`${SERVER_BASE_URL}${selectedReport.reportImageUrl}`}
                      alt={selectedReport.reportType}
                      className="w-full h-auto"
                      onError={(e) => {
                        console.error('Image failed to load from:', `${SERVER_BASE_URL}${selectedReport.reportImageUrl}`);
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="16" fill="%23999"%3EImage Failed to Load%3C/text%3E%3C/svg%3E';
                      }}
                      onLoad={() => {
                        console.log('Image loaded successfully');
                      }}
                    />
                  </div>
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
                    disabled={downloading}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
                  >
                    <Download size={18} />
                    {downloading ? "Downloading..." : "Download Report"}
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