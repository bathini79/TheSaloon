import { Routes, Route } from "react-router-dom";
import CustomerHome from "@/customer/pages/CustomerHome";
import CartPage from "@/customer/components/CartPage";
import BookingsPage from "@/customer/components/Bookings";
import Header from "@/customer/components/Header";
import Footer from "@/customer/components/Footer";

const CustomerRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        {/* Define routes relative to /customer */}
        <Route path="/" element={<CustomerHome />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/cart" element={<CartPage />} />
        {/* Fallback Route */}
      </Routes>
      <Footer />
    </>
  );
};

export default CustomerRoutes;
