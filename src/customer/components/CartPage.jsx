import React, { useState } from "react";
import DatePicker from "react-datepicker"; // Install using: npm install react-datepicker
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../../components/ui/button";
import { Clock } from "lucide-react";
import "./CartPage.css";
import { createBooking } from "@/services/api";
const CartPage = () => {
  const services = [
    {
      id: 1,
      name: "Service 1",
      duration: "59 min",
      originalPrice: 126.38,
      discountPrice: 106.19,
    },
    {
      id: 2,
      name: "Service 2",
      duration: "81 min",
      originalPrice: 101.49,
      discountPrice: 90.72,
    },
  ];

  const [schedule, setSchedule] = useState({});
  const [error, setError] = useState("");

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

  const total = services
    .reduce((total, service) => total + service.discountPrice, 0)
    .toFixed(2);

  const handleCheckout = async () => {
    const isComplete = services.every(
      (service) => schedule[service.id]?.date && schedule[service.id]?.time,
    );

    if (!isComplete) {
      setError("Please select a date and time for all services.");
      return;
    }

    // Prepare the payload to send to the API
    const payload = {
      status: "PENDING_PAYMENT",
      user: {
        name: "John Doe",
        email: "plsgq@example.com",
        phone: "1234567890",
      },
      services: services.map((service) => ({
        serviceId: service.id,
        name: service.name,
        booking_date: schedule[service.id]?.date,
        booking_time: schedule[service.id]?.time,
        amount: service.discountPrice,
      })),
    };
    // Assuming 'createBooking' is an API call function
    // (Make sure you have an actual API call function implemented)
    try {
      const response = await createBooking(payload); // Replace with your API call
      // Handle the response (e.g., show success message, redirect)
    } catch (error) {
      // Handle the error (e.g., show error message)
      setError("Error while creating booking.");
    }

    // You can replace this with your actual API call
    // Example: apiCallToSendData(payload);
  };

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Your Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Service Scheduling */}
        <div className="flex-1">
          {services.map((service) => (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-4 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <h2 className="font-bold text-lg text-gray-800 mb-4">
                {service.name}
              </h2>
              <p className="text-sm text-gray-500 mb-2 flex items-center">
                <Clock className="inline-block text-red-500 mr-2" />
                Duration: {service.duration}
              </p>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Date:
                </label>
                <DatePicker
                  selected={schedule[service.id]?.date || null}
                  onChange={(date) => handleDateChange(date, service.id)}
                  className="w-72 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Time:
                </label>
                <select
                  value={schedule[service.id]?.time || ""}
                  onChange={(e) => handleTimeChange(e.target.value, service.id)}
                  className="w-72 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:outline-none bg-white"
                >
                  <option value="" disabled>
                    Select Time
                  </option>
                  {generateTimeSlots("09:00", "18:00", service.duration).map(
                    (slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ),
                  )}
                </select>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="lg:w-1/3 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Cart Summary</h2>
          {services.map((service) => (
            <div key={service.id} className="flex justify-between mb-2">
              <span className="text-gray-600">{service.name}</span>
              <span className="text-gray-800 font-semibold">
                ${service.discountPrice.toFixed(2)}
              </span>
            </div>
          ))}
          <div className="flex justify-between text-lg font-semibold mt-4">
            <span>Total:</span>
            <span>$ {total}</span>
          </div>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <Button
            onClick={handleCheckout}
            className="w-full bg-red-500 text-white py-3 rounded-lg mt-6 hover:bg-red-600"
          >
            Proceed to Payment
          </Button>

          {/* Cart Copywriting */}
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
      </div>
    </div>
  );
};

// Helper function to generate time slots
const generateTimeSlots = (start, end, duration) => {
  const slots = [];
  let [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);
  const durationMinutes = parseInt(duration, 10); // Ensure duration is treated as an integer

  while (
    startHour < endHour ||
    (startHour === endHour && startMinute < endMinute)
  ) {
    slots.push(
      `${String(startHour).padStart(2, "0")}:${String(startMinute).padStart(
        2,
        "0",
      )}`,
    );
    startMinute += durationMinutes;

    // Correct the overflow of minutes
    while (startMinute >= 60) {
      startMinute -= 60;
      startHour += 1;
    }
  }

  return slots;
};

export default CartPage;
