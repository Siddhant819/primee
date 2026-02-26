// src/components/layout/Layout.tsx
import { ReactNode, FC } from "react";
import EmergencyBanner from "./EmergencyBanner";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Properly type children
interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <EmergencyBanner />
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

export default Layout;