import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DynamicForm } from "@/shared/DynamicForm/DynamicForm";
import { fetchAllEmployees, fetchBookingServicesByBookingId, fetchBookingServicesByUserId } from "@/services/api"; // Fetch services by bookingId

// adminBookingsFormConfig.js
export const adminBookingsFormConfig = (formData, employees) => {
  const serviceFields = formData.bookingServices?.map((service) => ({
    id: `service_${service?.$id}`,
    label: `Assign Employee for ${service?.services[0]?.name}`,
    type: 'select',
    required: true,
    options: employees?.map((employee) => ({
      $id:employee.$id,
      address: employee.first_name+employee.last_name,
    })),
  })) || [];

  // Return the updated form config
  return [
    {
      id: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: [
        'PENDING_PAYMENT',
        'PAYMENT_FAILED',
        'PENDING_CONFIRMATION',
        'CONFIRMED',
        'SERVICE_DONE',
        'CUSTOMER_NO_SHOW',
        'PENDING_REFUND',
        'CANCELLED_BY_ADMIN',
        'CANCELLED_BY_CUSTOMER',
      ].map(i => ({
        address: i,
        $id: i,
      })),
    },
    {
      id: "name",
      label: "User",
      type: "text",
      disabled: true,
    },
    {
      id: "location",
      label: "Location",
      type: "text",
      disabled: true,
    },
    ...serviceFields, // Add the dynamically generated fields for services
  ];
};

const AdminBookingsForm = ({ onClose, formData,handleAddBookings }) => {
  const [services, setServices] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  

  // Fetch services and employees based on formData.bookingId
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch booking services for the specific bookingId
        const fetchedServices = await fetchBookingServicesByUserId(formData.$id);
        setServices(
          fetchedServices?.map((ser) => ({
            ...ser.services, // Spread the properties of ser.services
            bookingId: ser.$id,    // 
          }))
        );        // Fetch employees (assuming you have a function to get them)
        const fetchedEmployees = await fetchAllEmployees();
        setEmployees(fetchedEmployees?.response?.documents);
      } catch (err) {
        setError("Error fetching services or employees");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (formData.$id) {
      fetchData();
    }
  }, [formData.$id]); // Trigger effect when bookingId changes
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>My Bookings</DialogTitle>
        </DialogHeader>
        <DynamicForm
          formConfig={adminBookingsFormConfig(formData, employees)} // Pass services and employees
          onClose={onClose}
          data={formData}
          onSubmit={(data)=>handleAddBookings(data)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AdminBookingsForm;
