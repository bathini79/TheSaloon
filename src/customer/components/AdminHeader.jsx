import { useCart } from "@/Context/CartContext";
import { useRole } from "@/Context/RoleContext";
import { account } from "@/services/appwrite/appwrite";
import { ShoppingCart, Calendar, LogOut } from "lucide-react";
import React, { useEffect, useState } from "react";
import { use } from "react";
import { useNavigate } from "react-router-dom";

function AdminHeader() {
  const navigate = useNavigate();
  const { setRole } = useRole();
  const  {clearCart} = useCart()
  const handleSignOut = async () => {
    try {
      await account.deleteSessions("current");
      localStorage.clear();
      setRole(null);
      clearCart()
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
        {/* Sign Out Icon */}
        <div
          className="relative cursor-pointer hover:text-gray-400"
          onClick={handleSignOut}
          title="Sign Out"
        >
          <LogOut size={24} />
        </div>
    </header>
  );
}

export default AdminHeader;
