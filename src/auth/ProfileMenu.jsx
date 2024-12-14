import React from "react";
import { useNavigate } from "react-router-dom";
import { account } from "@/services/appwrite/appwrite";
import { LogOut } from "lucide-react";
import { useRole } from "@/Context/RoleContext";
import { useCart } from "@/Context/CartContext";

const ProfileMenu = () => {
  const navigate = useNavigate();
  const { setRole } = useRole();
  const {clearCart} = useCart()

  const handleSignOut = async () => {
    try {
      await account.deleteSession("current");
      localStorage.clear();
      clearCart()
      setRole(null); // Clear the global role state
      
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  return (
    <div className="flex">
      {/* Sign Out Button with flex layout */}
      <button
        onClick={handleSignOut}
        className="flex items-center p-3"
        aria-label="Sign Out"
      >
        <LogOut className="mr-2" size={20} />
        Sign Out
      </button>
    </div>
  );
};

export default ProfileMenu;