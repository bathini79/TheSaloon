import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { account } from "@/services/appwrite/appwrite";
import { useRole } from "@/Context/RoleContext";

const Login = () => {
  const navigate = useNavigate();
  const { setRole,setUserData } = useRole();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await account.createEmailPasswordSession(
        formData.email,
        formData.password
      );
      if (response) {
        const user = await account.get();
        if (user) {
          const userRole = user?.prefs?.role;
          setRole(userRole);
          setUserData(user)
          navigate(`/${userRole}`, { replace: true });
        }
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container mx-auto flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded-lg shadow-md w-96"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="mb-4"
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
          className="mb-4"
        />
        <Button
          type="submit"
          className="w-full"
          style={{ backgroundColor: "#EF4444", color: "#fff" }}
        >
          Login
        </Button>
        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <span
            className="text-red-600 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
