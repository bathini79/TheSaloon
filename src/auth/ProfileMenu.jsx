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
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
        aria-label="Profile Menu"
      >
        <User size={24} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-200">
          <ul className="py-2">
            <li
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2" size={20} />
              Sign Out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
