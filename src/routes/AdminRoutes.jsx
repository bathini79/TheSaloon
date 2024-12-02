import Locations from "@/admin/pages/Locations";
import AdminHome from "../admin/pages/AdminHome";
import Services from "../admin/pages/Services";
import { Route, Routes } from "react-router-dom"; // Correct import of Route and Routes
import { SidebarProvider } from "@/shared/ui/sidebar";
import { AppSidebar } from "@/admin/components/Sidebar/AppSidebar";
import Employees from "@/admin/pages/Employees";
import AdminBookings from "@/admin/pages/AdminBooking";

const adminRoutesItem = [
  { path: "/admin", element: <AdminHome /> },
  { path: "/admin/services", element: <Services /> },
  { path: "/admin/locations", element: <Locations /> },
  { path: "/admin/employees", element: <Employees /> },
  { path: "/admin/bookings", element: <AdminBookings /> },
];

const AdminRoutes = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <Routes>
        {adminRoutesItem.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </SidebarProvider>
  );
};

export default AdminRoutes;
