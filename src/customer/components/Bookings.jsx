import React, { useEffect, useState } from "react";
import { useRole } from "@/Context/RoleContext";
import { fetchBookingServicesByUserId } from "@/services/api";
import { Clock, Calendar, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppointmentStatus } from "@/enums";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userData } = useRole();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Simulated API call with hardcoded limit
        const data = await fetchBookingServicesByUserId(userData.customUserId);
        if (data) {
          setBookings(data?.documents || []);
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bookings?.map((booking) => (
            <div
              key={booking.$id}
              className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Render each service in the booking */}
              {booking?.bookingServices?.map((service, index) => (
                <div key={service.$id} className="mb-4">
                  <CardHeader>
                    <img
                      src={service?.services?.[0]?.image} // Assuming service has an image property
                      alt={service?.services?.[0]?.name}
                      className="w-full h-40 object-cover rounded-t-lg"
                    />
                  </CardHeader>
                  <CardContent>
                    <CardTitle>{service?.services?.[0]?.name}</CardTitle>
                    <p className="text-sm text-gray-600 flex items-center mb-2">
                      <Clock className="mr-2 text-red-500" />
                      Duration: {service?.services?.[0]?.service_time}m
                    </p>

                    <span
                      className="font-bold text-lg"
                      style={{ color: "rgba(254, 0, 0, 0.76)" }}
                    >
                      Price: ₹{service?.services?.[0].selling_price}
                    </span>
                    {/* Only show the selling price, remove duplicate prices */}
                  </CardContent>
                  <p className="text-sm text-gray-500 flex items-center mb-2">
                    <Calendar className="mr-2 text-red-500" />
                    Date:{" "}
                    <span className="ml-1 text-gray-800 font-semibold">
                      {new Date(service?.date).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500 flex items-center mb-2">
                    <Clock className="mr-2 text-red-500" />
                    Time:{" "}
                    <span className="ml-1 text-gray-800 font-semibold">
                      {service?.time}
                    </span>
                  </p>
                  {/* Add a small divider between services */}
                  {index < booking.bookingServices.length - 1 && (
                    <div className="my-4 border-t border-gray-300"></div> // Divider line
                  )}
                </div>
              ))}

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
                  Total: ₹{booking.total.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
