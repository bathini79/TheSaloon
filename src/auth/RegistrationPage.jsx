import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { createUsers } from "@/services/api"; // Ensure this is implemented correctly
import { account } from "@/services/appwrite/appwrite";
import { Button } from "@/components/ui/button";
import { useRole } from "@/Context/RoleContext";

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const { setRole,setUserData } = useRole();
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [loading,setLoading] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      // Step 1: Create a new user
      const user = await account.create(
        "unique()", // Auto-generate user ID
        formData.email,
        formData.password,
        formData.name
      );

      // Step 2: Log the user in to authenticate
      await account.createEmailPasswordSession(formData.email, formData.password);

      // Step 3: Update user preferences with the role
      await account.updatePrefs({
        role: "customer",
      });

      // Step 4: Save additional user information in your backend (optional)
      await createUsers({
        userId: user.$id,
        email: formData.email,
        name: formData.name,
        phone: formData.phone
      });
      setRole("customer")
      // Step 5: Redirect to customer
      navigate("/customer");
    } catch (err) {
      console.error("Registration Error:", err);
      setError(err.message || "Error during registration. Try again.");
    }
    setLoading(false)
  };

  return (
    <div className="container mx-auto flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded-lg shadow-md w-96"
        onSubmit={handleRegister}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <Input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="mb-4"
        />
        <Input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleInputChange}
          required
          className="mb-4"
        />
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
          disabled={loading}
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
                    {loading ? "Registering..." : "Register"}
        </Button>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            className="text-red-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Registration;
