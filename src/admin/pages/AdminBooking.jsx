import React, { useState } from "react";
import { createBooking, createBookingServices, fetchAllBookings } from "@/services/api";
import DashboardTable from "@/shared/DynamicTable/DashboardTable";
import AdminBookingsForm from "../components/AdminBookings/AdminBookingsForm";
import { useToast } from "@/hooks/use-toast";
import { bookingsTableConfig } from "../metadata/adminBookingsTableConfig";

const AdminBookings = () => {
  const [adminBookingsAdd, setAdminBookingsAdd] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateData, setUpdateData] = useState(false);

  const onClose = () => {
    setAdminBookingsAdd(false);
    setReloadData(true);
    setUpdateData(false);
  };

  // This is where you define the handleEdit function
  const handleEdit = (location) => {
    location.name = location.user.name;
    location.location = location.location.name;

    setAdminBookingsAdd(true);
    setFormData(location);
    setUpdateData(true);
    // Your logic for editing the location goes here
  };
  const { toast } = useToast();

  const createBookingServiceFunc = async (bookingId, employeeId) => {
    try {
      await createBookingServices(
        {
          $id: bookingId, // Link to the booking ID
          employee: employeeId, // Service ID
        },
        true
      );
    } catch (error) {
      console.error("Error while creating booking service:", error);
    }
  };
  const handleAddBookings = async (data) => {
    const payload = {
      $id: data.$id,
      status: data.status,
    };
    const booking = await createBooking(payload, updateData);

    if (booking && booking.$id) {
      const serviceKeys = Object.keys(data).filter((key) =>
        key.startsWith("service_")
      );
      const _data = serviceKeys.map((key) => ({
        bookingId: key.split("service_")[1], // Extract the part after "service_"
        employeeId: data[key], // Get the value of the current service key
      }));
      for (const service of _data) {
        await createBookingServiceFunc(service.bookingId, service.employeeId);
      }
      setTimeout(()=>{
        onClose()
      },[2000])
    }
  };
  return (
    <div className="flex flex-col items-center px-6 py-8 min-h-screen bg-gray-50 w-full">
      {/* Header Section */}
      <div className="flex justify-between items-center w-full mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
      </div>

      {/* Table Section */}
      <div className="w-full bg-white shadow-md rounded-lg p-6">
        <DashboardTable
          fetchDataFunc={fetchAllBookings} // Function to fetch data
          columnsConfig={bookingsTableConfig({ handleEdit })} // Pass handleEdit within an object
          placeholder="Search for a bookings..." // Optional search placeholder
          reloadData={reloadData}
        />
      </div>

      {adminBookingsAdd && (
        <AdminBookingsForm
          onClose={onClose}
          handleAddBookings={handleAddBookings}
          formData={formData}
          updateData={updateData}
        />
      )}
    </div>
  );
};

export default AdminBookings;
