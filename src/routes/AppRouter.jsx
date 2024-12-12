import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import CustomerRoutes from "./CustomerRoutes";
import Login from "@/auth/LoginPage";
import Registration from "@/auth/RegistrationPage";
import { account } from "@/services/appwrite/appwrite";
import { useRole } from "@/Context/RoleContext";
import { fetchByUserId } from "@/services/api";

const AppRouter = () => {
  const { role, setRole,setUserData } = useRole();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await account.get();
        const userRole = user.prefs.role // Fetch role from user preferences
        const userDataRes = await fetchByUserId(user.$id)
        setUserData({...user,customUserId:userDataRes?.$id});
        setRole(userRole);
      } catch (error) {
        console.error("No active session:", error.message);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [setRole]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={!role ? <Login /> : <Navigate to={`/${role}`} />} />
        <Route path="/register" element={!role ? <Registration /> : <Navigate to={`/${role}`} />} />

        {/* Role-Based Routes */}
        <Route
          path="/admin/*"
          element={role === "admin" ? <AdminRoutes /> : <Navigate to="/login" />}
        />
        <Route
          path="/customer/*"
          element={role === "customer" ? <CustomerRoutes /> : <Navigate to="/login" />}
        />

        {/* Default Route */}
        <Route path="/" element={role ? <Navigate to={`/${role}`} /> : <Navigate to="/login" />} />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};


export default AppRouter;
