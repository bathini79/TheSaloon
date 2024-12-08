import { Routes, Route } from "react-router-dom";
import CustomerHome from "@/customer/pages/CustomerHome";
import CartPage from "@/customer/components/CartPage";
import BookingsPage from "@/customer/components/Bookings";

const CustomerRoutes = () => {
  return (
    <Routes>
      {/* Define routes relative to /customer */}
      <Route path="/" element={<CustomerHome />} />
      <Route path="/bookings" element={<BookingsPage />} />
      <Route path="/cart" element={<CartPage />} />
      {/* Fallback Route */}
    </Routes>
  );
};

export default CustomerRoutes;
