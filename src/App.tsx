import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ScrollToTop from "@/components/ScrollToTop";

const queryClient = new QueryClient();

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
        </Suspense>

      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;