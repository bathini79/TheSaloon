import { useCart } from "@/Context/CartContext";
import { useRole } from "@/Context/RoleContext";
import { account } from "@/services/appwrite/appwrite";
import { ShoppingCart, Calendar, LogOut } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const checkout = () => navigate("/customer/cart");
  const { setRole } = useRole();
  const viewBookings = () => navigate("/customer/bookings");
  let { cart,setCart } = useCart();

  const handleSignOut = async () => {
    try {
      await account.deleteSessions("current");
      localStorage.clear();
      setRole(null);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  return (
    <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      {/* Logo */}
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Define Salon
      </h1>

      {/* Action Icons */}
      <div className="flex items-center gap-6">
        {/* View Bookings Icon */}
        <div
          className="relative cursor-pointer hover:text-gray-400"
          onClick={viewBookings}
          title="View Bookings"
        >
          <Calendar size={24} />
        </div>

        {/* Cart Icon with Badge */}
        <div
          className="relative cursor-pointer hover:text-gray-400"
          onClick={checkout}
          title="Cart"
        >
          <ShoppingCart size={24} />
          {cart?.length > 0 && (
            <span
              className="absolute top-[-6px] right-[-6px] bg-white text-red-600 font-bold text-xs rounded-full w-5 h-5 flex items-center justify-center"
            >
              {cart.length}
            </span>
          )}
        </div>

        {/* Sign Out Icon */}
        <div
          className="relative cursor-pointer hover:text-gray-400"
          onClick={handleSignOut}
          title="Sign Out"
        >
          <LogOut size={24} />
        </div>
      </div>
    </header>
  );
}

export default Header;
