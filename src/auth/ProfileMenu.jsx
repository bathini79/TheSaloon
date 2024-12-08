import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "@/services/appwrite/appwrite";
import { LogOut, User } from "lucide-react";
import { useRole } from "@/Context/RoleContext";

const ProfileMenu = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { setRole } = useRole(); // Access setRole from RoleContext

  const handleSignOut = async () => {
    try {
      await account.deleteSession("current");
      localStorage.clear();
      setRole(null); // Clear the global role state
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  return (
    <div className="relative">
      {/* Profile Icon */}
      <button
        onClick={handleSignOut}
        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
        aria-label="Profile Menu"
      >
        <LogOut className="mr-2" size={20} />
        Sign Out
      </button>
    </div>
  );
};

export default ProfileMenu;
