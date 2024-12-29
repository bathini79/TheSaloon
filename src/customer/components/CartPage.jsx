import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../../components/ui/button";
import { Clock, XCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "@/Context/CartContext";
import { useRole } from "@/Context/RoleContext";
import { createBooking, createBookingServices, fetchAllEmployees } from "@/services/api";

const CartPage = () => {
  const { cart, selectedLocation, clearCart, removeItemFromCart } = useCart();
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [schedule, setSchedule] = useState({});
  const [error, setError] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState({});
  const { userData } = useRole(); // Access setRole from RoleContext
  const initialAvialableDays = convertAvailableDays(["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"])
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      const { response } = await fetchAllEmployees();
      if (response) {
        setEmployees(response.documents || []);
      }
    };
    fetchEmployees();
  }, [cart]);

  const handleDateChange = (date, serviceId) => {
    setSchedule((prev) => ({
      ...prev,
      [serviceId]: { ...prev[serviceId], date },
    }));
  };

  const handleTimeChange = (time, serviceId) => {
    setSchedule((prev) => ({
      ...prev,
      [serviceId]: { ...prev[serviceId], time },
    }));
  };

  const handleEmployeeChange = async (employeeId, serviceId) => {
    setSelectedEmployees((prev) => ({
      ...prev,
      [serviceId]: employeeId,
    }));

    // Fetch the selected employee details
    const selectedEmployee = employees.find((employee) => employee.$id === employeeId);

    if (selectedEmployee) {
      const availableDaysStr = selectedEmployee.available_days || []
      const availableDays = convertAvailableDays(availableDaysStr);
      setSchedule((prev) => ({
        ...prev,
        [serviceId]: {
          availableDays,
        },
      }));
    } else {
      setSchedule((prev) => ({
        ...prev,
        [serviceId]: {
          availableDays: convertAvailableDays(["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]),
        },
      }));
    }
  };

  function convertAvailableDays(availableDaysStr) {
    const daysMap = {
      sunday: 0,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
    };

    // Split the string by commas, trim spaces, and map to day indices
    return availableDaysStr
      .map((day) => day.trim().toLowerCase()) // Ensure consistent case and trim spaces
      .map((day) => daysMap[day]) // Convert day string to index
      .filter((day) => day !== undefined); // Filter out invalid days
  };

  const total = cart
    .reduce((total, item) => total + item.selling_price, 0)
    .toFixed(2);

  const handleCheckout = async () => {
    // Ensure all services in the cart have a selected date and time
    const isComplete = cart.every(
      (item) => schedule[item.$id]?.date && schedule[item.$id]?.time
    );

    if (!isComplete) {
      setError("Please select a date and time for all services.");
      return;
    }

    const payload = {
      status: "PENDING_PAYMENT",
      user: [userData.customUserId],
      location: [selectedLocation.$id],
      total: +total,
      userId: userData.customUserId,
    };

    setIsLoading(true); // Start loading

    try {
      const booking = await createBooking(payload);
      if (booking && booking.$id) {
        for (const service of cart) {
          const selectedEmployeeId = selectedEmployees[service.$id];
          await createBookingServiceFunc(
            booking.$id,
            service.$id,
            schedule[service.$id].date,
            schedule[service.$id].time,
            selectedEmployeeId
          );
        }
        clearCart([]);
        navigate("/customer/bookings");
      }
    } catch (error) {
      setError("Error while creating booking.");
    } finally {
      setIsLoading(false); // End loading
    }
  };
  console.log("employees", employees);
  const createBookingServiceFunc = async (
    bookingId,
    serviceId,
    date,
    time,
    employeeId
  ) => {
    try {
      await createBookingServices({
        bookings: [bookingId],
        services: [serviceId],
        date,
        time,
        employee: [employeeId] || null, // Include the selected employee, if any
      });
    } catch (error) {
      console.error("Error while creating booking service:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-100">
      {cart?.length ? <><h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Your Cart
      </h1><div className="flex flex-col lg:flex-row gap-6">
          {/* Service Scheduling */}
          <div className="flex-1">
            {cart?.map((item) => (
              <div
                key={item.$id}
                className="bg-white rounded-lg shadow-lg p-6 mb-4 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                <h2 className="flex justify-between items-center font-bold text-lg text-gray-800 mb-4">
                  <span>{item?.name}</span>
                  <div onClick={() => removeItemFromCart(item.$id)}>
                    <XCircle className="text-red-500" size={24} />
                  </div>
                </h2>

                <p className="text-sm text-gray-500 mb-2 flex items-center">
                  <Clock className="inline-block text-red-500 mr-2" />
                  Duration: {item?.service_time}m
                </p>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Stylist:
                  </label>
                  <select
                    value={selectedEmployees[item.$id] || ""}
                    onChange={(e) => handleEmployeeChange(e.target.value, item.$id)}
                    className="w-72 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:outline-none bg-white"
                  >
                    <option value=""> Any Employee</option>
                    {employees.map((employee) => (
                      <option key={employee.$id} value={employee.$id}>
                        {employee.first_name} {employee.last_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Date:
                  </label>
                  <DatePicker
                    selected={schedule[item.$id]?.date || null}
                    onChange={(date) => handleDateChange(date, item.$id)}
                    className="w-72 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    filterDate={(date) => {
                      const dayOfWeek = date.getDay(); // Get the day of the week (0: Sunday, 1: Monday, etc.)
                      // Check if the day of the week is in the available days for the employee
                      return schedule[item.$id]?.availableDays?.includes(dayOfWeek) || initialAvialableDays.includes(dayOfWeek);
                    }} />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Time:
                  </label>
                  <select
                    value={schedule[item.$id]?.time || ""}
                    onChange={(e) => handleTimeChange(e.target.value, item.$id)}
                    className="w-72 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:outline-none bg-white"
                  >
                    <option value="" disabled>
                      Select Time
                    </option>
                    {generateTimeSlots(
                      employees?.shift_starts_at || selectedLocation?.operational_hours_starts_at,
                      employees?.shift_end_at || selectedLocation?.operational_hours_ends_at,
                      item?.service_time
                    )?.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}

                  </select>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:w-1/3 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Cart Summary</h2>
            {cart?.map((item) => (
              <div key={item.$id} className="flex justify-between mb-2">
                <span className="text-gray-600">{item.name}</span>
                <span className="text-gray-800 font-semibold">
                  ₹ {item.selling_price.toFixed(2)}
                </span>
              </div>
            ))}
            <div className="flex justify-between text-lg font-semibold mt-4">
              <span>Total:</span>
              <span>₹ {total}</span>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}

            <Button
              disabled={isLoading} // Disable button when loading
              onClick={handleCheckout}
              className="w-full bg-red-500 text-white py-3 rounded-lg mt-6 hover:bg-red-600"
            >
              {isLoading && (
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
              {isLoading ? "Proceeding..." : "Proceed to Payment"}
            </Button>
            <div className="mt-8 text-center text-gray-700">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Almost There!
              </h2>
              <p className="text-lg">
                You're just one step away from booking your luxurious salon
                experience. <strong>Define Salon</strong> ensures you'll leave
                looking and feeling your best.
              </p>
              <p className="mt-4 text-sm text-gray-500">
                Complete your booking and enjoy exclusive pampering sessions with
                our top-tier services!
              </p>
            </div>
          </div>
        </div></> : <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
          <p className="text-sm text-gray-500 mb-6">Looks like you haven’t added any services yet. Start adding your favorite services to schedule your appointment!</p>
          <Button
            onClick={() => navigate("/")}
            className="w-full text-white bg-red-600 hover:bg-red-500 transition-colors duration-300"
          >
            Browse Services
          </Button>
        </div>
      </div>
      }
    </div>
  );
};

// Helper function to generate time slots
const generateTimeSlots = (start, end, duration) => {
  const today = new Date();

  const slots = [];
  let [startHour, startMinute] = start?.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);
  const durationMinutes = parseInt(duration, 10);

  while (
    startHour < endHour ||
    (startHour === endHour && startMinute < endMinute)
  ) {
    slots.push(
      `${String(startHour).padStart(2, "0")}:${String(startMinute).padStart(
        2,
        "0"
      )}`
    );
    startMinute += durationMinutes;

    while (startMinute >= 60) {
      startMinute -= 60;
      startHour += 1;
    }
  }

  return slots;
};


export default CartPage;
