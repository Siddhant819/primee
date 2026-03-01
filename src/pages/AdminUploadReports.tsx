import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, ArrowLeft, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import { API_BASE_URL } from "@/api/config";

const AdminUploadReports = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [reports, setReports] = useState([]);
  const [reportLoading, setReportLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [createNewPatient, setCreateNewPatient] = useState(false);
  
  const [formData, setFormData] = useState({
    patientId: "",
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    patientDateOfBirth: "",
    patientGender: "",
    reportType: "X-Ray",
    department: "",
    reportDate: "",
    description: "",
    doctorName: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchPatients();
    fetchReports();
  }, []);

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

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_BASE_URL}/reports`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setReports(data.reports || []);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const handlePatientChange = (patientId: string) => {
    const selected = patients.find((p: any) => p._id === patientId);
    if (selected) {
      setFormData({
        ...formData,
        patientId: selected._id,
        patientName: selected.fullName,
        patientEmail: selected.email,
        patientPhone: selected.phone,
      });
      setCreateNewPatient(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error("Please select a report image");
      return;
    }

    // Validate based on mode
    if (createNewPatient) {
      if (!formData.patientName || !formData.patientEmail || !formData.patientPhone || 
          !formData.patientDateOfBirth || !formData.patientGender) {
        toast.error("Please fill all patient details");
        return;
      }
    } else {
      if (!formData.patientId) {
        toast.error("Please select a patient");
        return;
      }
    }

    if (!formData.reportType || !formData.department || !formData.reportDate || !formData.doctorName) {
      toast.error("Please fill all report fields");
      return;
    }

    setReportLoading(true);

    try {
      const token = localStorage.getItem("authToken");
      const formDataToSend = new FormData();
      
      if (createNewPatient) {
        formDataToSend.append("patientName", formData.patientName);
        formDataToSend.append("patientEmail", formData.patientEmail);
        formDataToSend.append("patientPhone", formData.patientPhone);
        formDataToSend.append("patientDateOfBirth", formData.patientDateOfBirth);
        formDataToSend.append("patientGender", formData.patientGender);
        formDataToSend.append("createNewPatient", "true");
      } else {
        formDataToSend.append("patientId", formData.patientId);
        formDataToSend.append("createNewPatient", "false");
      }

      formDataToSend.append("reportType", formData.reportType);
      formDataToSend.append("department", formData.department);
      formDataToSend.append("reportDate", formData.reportDate);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("doctorName", formData.doctorName);
      formDataToSend.append("reportImage", selectedFile);

      const response = await fetch(`${API_BASE_URL}/reports/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        toast.success(`Report uploaded successfully! Patient ID: ${data.patientId}`);
        setSelectedFile(null);
        setFormData({
          patientId: "",
          patientName: "",
          patientEmail: "",
          patientPhone: "",
          patientDateOfBirth: "",
          patientGender: "",
          reportType: "X-Ray",
          department: "",
          reportDate: "",
          description: "",
          doctorName: "",
        });
        setCreateNewPatient(false);
        fetchReports();
        fetchPatients();
      } else {
        toast.error(data.message || "Failed to upload report");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setReportLoading(false);
    }
  };

  const deleteReport = async (id: string) => {
    if (!confirm("Are you sure you want to delete this report?")) return;

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_BASE_URL}/reports/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        fetchReports();
        toast.success("Report deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete report");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-slate-900">Upload Medical Reports</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Upload New Report</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Patient Selection Mode Toggle */}
              <div className="flex gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setCreateNewPatient(false);
                    setFormData({ ...formData, patientId: "" });
                  }}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                    !createNewPatient
                      ? "bg-slate-900 text-white"
                      : "bg-slate-200 text-slate-900 hover:bg-slate-300"
                  }`}
                >
                  Select Existing Patient
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCreateNewPatient(true);
                    setFormData({ ...formData, patientId: "" });
                  }}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                    createNewPatient
                      ? "bg-slate-900 text-white"
                      : "bg-slate-200 text-slate-900 hover:bg-slate-300"
                  }`}
                >
                  <Plus size={16} className="inline mr-2" />
                  Create New Patient
                </button>
              </div>

              {/* Existing Patient Selection */}
              {!createNewPatient && (
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Select Patient *
                  </label>
                  <select
                    value={formData.patientId}
                    onChange={(e) => handlePatientChange(e.target.value)}
                    required={!createNewPatient}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                  >
                    <option value="">Choose a patient</option>
                    {patients.map((patient: any) => (
                      <option key={patient._id} value={patient._id}>
                        {patient.patientId} - {patient.fullName}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* New Patient Form */}
              {createNewPatient && (
                <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-slate-900 mb-3">Patient Information</h3>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleChange}
                      required={createNewPatient}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="patientEmail"
                      value={formData.patientEmail}
                      onChange={handleChange}
                      required={createNewPatient}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="patientPhone"
                      value={formData.patientPhone}
                      onChange={handleChange}
                      required={createNewPatient}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                      placeholder="9841234567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      name="patientDateOfBirth"
                      value={formData.patientDateOfBirth}
                      onChange={handleChange}
                      required={createNewPatient}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Gender *
                    </label>
                    <select
                      name="patientGender"
                      value={formData.patientGender}
                      onChange={handleChange}
                      required={createNewPatient}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Report Details */}
              <div className="pt-4 border-t border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-4">Report Information</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Report Type *
                    </label>
                    <select
                      name="reportType"
                      value={formData.reportType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                    >
                      <option value="X-Ray">X-Ray</option>
                      <option value="CT Scan">CT Scan</option>
                      <option value="Ultrasound">Ultrasound</option>
                      <option value="Blood Test">Blood Test</option>
                      <option value="MRI">MRI</option>
                      <option value="ECG">ECG</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Department *
                    </label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                      placeholder="e.g., Cardiology"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Report Date *
                    </label>
                    <input
                      type="date"
                      name="reportDate"
                      value={formData.reportDate}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Doctor Name *
                    </label>
                    <input
                      type="text"
                      name="doctorName"
                      value={formData.doctorName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                      placeholder="Dr. John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Description (Optional)
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                      placeholder="Add any additional notes..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Report Image (PNG/JPG) *
                    </label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center cursor-pointer hover:border-slate-900 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                        className="hidden"
                        id="file-input"
                      />
                      <label htmlFor="file-input" className="cursor-pointer">
                        <Upload size={32} className="mx-auto text-slate-400 mb-2" />
                        <p className="text-sm text-slate-600">
                          {selectedFile ? selectedFile.name : "Click to upload or drag and drop"}
                        </p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={reportLoading}
                className="w-full bg-slate-900 text-white font-semibold py-2.5 rounded-lg hover:bg-slate-800 transition-all disabled:opacity-50"
              >
                {reportLoading ? "Uploading..." : "Upload Report"}
              </button>
            </form>
          </div>

          {/* Reports List */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Recent Reports ({reports.length})</h2>
            <div className="max-h-96 overflow-y-auto space-y-4">
              {reports.length === 0 ? (
                <p className="text-center text-slate-600">No reports uploaded yet</p>
              ) : (
                reports.slice(0, 10).map((report: any) => (
                  <div key={report._id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900">{report.reportType}</p>
                        <p className="text-sm text-slate-600">{report.patientName}</p>
                        <p className="text-xs text-slate-500">
                          ID: {report.patientId?.patientId || 'N/A'}
                        </p>
                        <p className="text-xs text-slate-500">
                          {new Date(report.reportDate).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteReport(report._id)}
                        className="text-red-600 hover:text-red-800 ml-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUploadReports;