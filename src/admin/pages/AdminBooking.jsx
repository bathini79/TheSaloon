import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import LocationForm from "../components/LocationComponent/LocationForm";
import { CirclePlus } from "lucide-react";
import { createBooking, fetchAllBookings } from "@/services/api";
import DashboardTable from "@/shared/DynamicTable/DashboardTable";
import AdminBookingsForm from "../components/AdminBookings.jsx/AdminBookingsForm";
import { adminBookingsTableConfig } from "../metadata/adminBookingsTableConfig";
import { useToast } from "@/hooks/use-toast";

const AdminBookings = () => {
  const [locationAdd, setLocationAdd] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateData, setUpdateData] = useState(false);

  const onClose = () => {
    setLocationAdd(false);
    setReloadData(true);
    setUpdateData(false);
  };

  // This is where you define the handleEdit function
  const handleEdit = (location) => {
    setLocationAdd(true);
    setFormData(location);
    setUpdateData(true);
    // Your logic for editing the location goes here
  };
  const { toast } = useToast();
  const handleAddLocation = async (data) => {
    const { response, error } = await createBooking(data, updateData);
    if (response) {
      toast({
        title: "Successfully added location",
      });
      onClose(); // Close dialog after successful submission
    } else {
      toast({
        title: error,
        variant: "destructive",
      });
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
          columnsConfig={adminBookingsTableConfig({ handleEdit })} // Pass handleEdit within an object
          placeholder="Search for a location..." // Optional search placeholder
          reloadData={reloadData}
        />
      </div>

      {locationAdd && (
        <AdminBookingsForm
          onClose={onClose}
          handleAddLocation={handleAddLocation}
          formData={formData}
          updateData={updateData}
        />
      )}
    </div>
  );
};

export default AdminBookings;
