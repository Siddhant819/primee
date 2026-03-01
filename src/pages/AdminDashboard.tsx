import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Users, Calendar, MessageSquare, FileText } from "lucide-react";
import { toast } from "sonner";
import { API_BASE_URL } from "@/api/config";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ patients: 0, appointments: 0, messages: 0, reports: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const [patientsRes, appointmentsRes, messagesRes, reportsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/patients`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_BASE_URL}/appointments`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_BASE_URL}/messages`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_BASE_URL}/reports`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const patientsData = await patientsRes.json();
      const appointmentsData = await appointmentsRes.json();
      const messagesData = await messagesRes.json();
      const reportsData = await reportsRes.json();

      setStats({
        patients: patientsData.patients?.length || 0,
        appointments: appointmentsData.appointments?.length || 0,
        messages: messagesData.messages?.length || 0,
        reports: reportsData.reports?.length || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("adminUser");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const dashboardItems = [
    {
      title: "Patients",
      count: stats.patients,
      icon: Users,
      color: "bg-blue-500",
      path: "/admin/patients",
    },
    {
      title: "Appointments",
      count: stats.appointments,
      icon: Calendar,
      color: "bg-green-500",
      path: "/admin/appointments",
    },
    {
      title: "Messages",
      count: stats.messages,
      icon: MessageSquare,
      color: "bg-purple-500",
      path: "/admin/messages",
    },
    {
      title: "Reports",
      count: stats.reports,
      icon: FileText,
      color: "bg-orange-500",
      path: "/admin/reports",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {dashboardItems.map((item) => (
            <div
              key={item.path}
              onClick={() => navigate(item.path)}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
            >
              <div className={`${item.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4`}>
                <item.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="text-4xl font-bold text-slate-900 mt-2">{item.count}</p>
              <p className="text-slate-500 text-sm mt-4">Click to manage</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button
              onClick={() => navigate("/admin/patients")}
              className="flex items-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
            >
              <Users size={18} />
              Manage Patients
            </button>
            <button
              onClick={() => navigate("/admin/appointments")}
              className="flex items-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
            >
              <Calendar size={18} />
              View Appointments
            </button>
            <button
              onClick={() => navigate("/admin/messages")}
              className="flex items-center gap-2 px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all"
            >
              <MessageSquare size={18} />
              View Messages
            </button>
            <button
              onClick={() => navigate("/admin/reports")}
              className="flex items-center gap-2 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all"
            >
              <FileText size={18} />
              Upload Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;