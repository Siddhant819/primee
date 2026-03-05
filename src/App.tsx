import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ScrollToTop from "@/components/ScrollToTop";

const queryClient = new QueryClient();

// --- Error Boundary Component ---
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 p-8 text-center font-sans">
          <div className="max-w-md">
            <h2 className="text-4xl font-serif font-bold text-white mb-6 tracking-tighter italic">
              Clinical <span className="font-light text-slate-400">Interruption</span>
            </h2>
            <p className="text-slate-400 mb-10 font-light leading-relaxed">
              A temporary diagnostic error has occurred in the interface layer. Please refresh or return to core.
            </p>
            <button
              onClick={() => window.location.href = "/"}
              className="px-10 py-4 bg-white text-slate-950 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-cyan-500 transition-all"
            >
              Return to Core
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ===============================
   Lazy Loaded Public Pages
================================ */
const Index = React.lazy(() => import("./pages/Index"));
const About = React.lazy(() => import("./pages/About"));
const Departments = React.lazy(() => import("./pages/Departments"));
const Doctors = React.lazy(() => import("./pages/Doctors"));
const Appointments = React.lazy(() => import("./pages/Appointments"));
const Contact = React.lazy(() => import("./pages/Contact"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const GalleryPage = React.lazy(() => import("./pages/GalleryPage"));
const ViewReports = React.lazy(() => import("./pages/ViewReports"));
const Register = React.lazy(() => import("./pages/Register"));

/* ===============================
   Lazy Loaded Admin Pages
================================ */
const AdminLogin = React.lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));
const AdminPatients = React.lazy(() => import("./pages/AdminPatients"));
const AdminAppointments = React.lazy(() => import("./pages/AdminAppointments"));
const AdminMessages = React.lazy(() => import("./pages/AdminMessages"));
const AdminUploadReports = React.lazy(() => import("./pages/AdminUploadReports"));

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <ScrollToTop />

        <Suspense
          fallback={
            <div className="flex justify-center items-center min-h-screen">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
          }
        >
          <ErrorBoundary>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Layout><Index /></Layout>} />
              <Route path="/about" element={<Layout><About /></Layout>} />
              <Route path="/departments" element={<Layout><Departments /></Layout>} />
              <Route path="/doctors" element={<Layout><Doctors /></Layout>} />
              <Route path="/appointments" element={<Layout><Appointments /></Layout>} />
              <Route path="/contact" element={<Layout><Contact /></Layout>} />
              <Route path="/gallery" element={<Layout><GalleryPage /></Layout>} />
              <Route path="/view-reports" element={<Layout><ViewReports /></Layout>} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Layout><NotFound /></Layout>} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/patients" element={<AdminPatients />} />
              <Route path="/admin/appointments" element={<AdminAppointments />} />
              <Route path="/admin/messages" element={<AdminMessages />} />
              <Route path="/admin/reports" element={<AdminUploadReports />} />
            </Routes>
          </ErrorBoundary>
        </Suspense>

      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;