import React, { useEffect, useState } from "react";
import { useRole } from "@/Context/RoleContext";
import { fetchBookingServicesByUserId } from "@/services/api";
import { Clock, Calendar, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppointmentStatus } from "@/enums";
const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userData } = useRole();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Simulated API call with hardcoded limit
        const data = await fetchBookingServicesByUserId(userData.$id);
        if (data) {
          console.log(data);
          setBookings(data || []);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to load bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (userData?.$id) fetchBookings();
  }, [userData?.$id]);
  const statusColors = {
    PENDING_PAYMENT: "bg-yellow-100 text-yellow-800",
    PAYMENT_FAILED: "bg-red-100 text-red-800",
    PENDING_CONFIRMATION: "bg-blue-100 text-blue-800",
    CONFIRMED: "bg-green-100 text-green-800",
    SERVICE_DONE: "bg-gray-100 text-gray-800",
    CUSTOMER_NO_SHOW: "bg-orange-100 text-orange-800",
    PENDING_REFUND: "bg-indigo-100 text-indigo-800",
    CANCELLED_BY_ADMIN: "bg-red-100 text-red-800",
    CANCELLED_BY_CUSTOMER: "bg-gray-100 text-gray-800",
  };

  const iconComponents = {
    PENDING_PAYMENT: <XCircle className="mr-1 text-yellow-500" />,
    PAYMENT_FAILED: <XCircle className="mr-1 text-red-500" />,
    PENDING_CONFIRMATION: <XCircle className="mr-1 text-blue-500" />,
    CONFIRMED: <CheckCircle className="mr-1 text-green-500" />,
    SERVICE_DONE: <CheckCircle className="mr-1 text-gray-500" />,
    CUSTOMER_NO_SHOW: <XCircle className="mr-1 text-orange-500" />,
    PENDING_REFUND: <XCircle className="mr-1 text-indigo-500" />,
    CANCELLED_BY_ADMIN: <XCircle className="mr-1 text-red-500" />,
    CANCELLED_BY_CUSTOMER: <XCircle className="mr-1 text-gray-500" />,
  };
  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
        My Bookings
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading bookings...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-600">
          You have no bookings yet. Explore our services and book your
          experience now!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings?.map((booking) => (
            <div
              key={booking.$id}
              className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              {booking?.bookingServices?.map((service) => {
                return (
                  <div key={service.$id} className="mb-4">
                    <h2 className="text-lg font-bold text-gray-800 mb-2">
                      {service?.services?.name} {/* Changed to 'service' */}
                    </h2>
                    <p className="text-sm text-gray-500 flex items-center mb-2">
                      <Calendar className="mr-2 text-red-500" />
                      Date:{" "}
                      <span className="ml-1 text-gray-800 font-semibold">
                        {new Date(service.date).toLocaleDateString()}{" "}
                        {/* Changed to 'service' */}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500 flex items-center mb-2">
                      <Clock className="mr-2 text-red-500" />
                      Time:{" "}
                      <span className="ml-1 text-gray-800 font-semibold">
                        {service.time} {/* Changed to 'service' */}
                      </span>
                    </p>
                  </div>
                );
              })}
              <p className="text-sm text-gray-500 flex items-center mb-4">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                    statusColors[booking.status]
                  }`}
                >
                  {iconComponents[booking.status]}
                  {AppointmentStatus[booking.status]}
                </span>
              </p>
              <div className="flex justify-between items-center">
                <span
                  className="text-lg font-semibold"
                  style={{ color: "rgba(254, 0, 0, 0.76)" }}
                >
                  ₹{booking.total.toFixed(2)}
                </span>
                {/* <Button
                  variant="outline"
                  className="text-sm bg-gray-100 text-red-500 border-red-500 hover:bg-red-100"
                  onClick={() => alert("Feature to be added!")}
                >
                  View Details
                </Button> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
