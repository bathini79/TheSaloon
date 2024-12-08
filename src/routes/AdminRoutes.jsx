import { Routes, Route } from "react-router-dom";
import AdminHome from "@/admin/pages/AdminHome";
import Services from "@/admin/pages/Services";
import Locations from "@/admin/pages/Locations";
import Employees from "@/admin/pages/Employees";
import AdminBookings from "@/admin/pages/AdminBooking";
import { SidebarProvider } from "@/shared/ui/sidebar";
import { AppSidebar } from "@/admin/components/Sidebar/AppSidebar";

const AdminRoutes = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <Routes>
        {/* Define routes relative to /admin */}
        <Route path="/" element={<AdminHome />} />
        <Route path="services" element={<Services />} />
        <Route path="locations" element={<Locations />} />
        <Route path="employees" element={<Employees />} />
        <Route path="bookings" element={<AdminBookings />} />
        {/* Fallback Route */}
        <Route path="*" element={<AdminHome />} />
      </Routes>
    </SidebarProvider>
  );
};

export default AdminRoutes;
