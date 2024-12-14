import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { account } from "@/services/appwrite/appwrite";
import { useRole } from "@/Context/RoleContext";
import { fetchByUserId } from "@/services/api";
import { Eye, EyeOff } from "lucide-react"; // For icons

const Login = () => {
  const navigate = useNavigate();
  const { setRole, setUserData } = useRole();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
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
          const userDataRes = await fetchByUserId(user.$id);
          setUserData({ ...user, customUserId: userDataRes?.[0]?.$id });
          navigate(`/${userRole}`, { replace: true });
        }
      }
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
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
        <div className="relative mb-4">
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button
            type="button"
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <Button
          type="submit"
          className="w-full"
          style={{ backgroundColor: "#EF4444", color: "#fff" }}
        >
          {loading && (
            <svg
              className="animate-spin h-4 w-4 mr-2 text-white inline-block"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
              ></path>
            </svg>
          )}
          {loading ? "Loggin in..." : "Login"}
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
