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
  const serviceFields =
    formData.bookingServices?.map((service) => {
      const options = service?.[`service_${service?.$id}`] ? service?.[`service_${service?.$id}`] : employees?.map((employee) => ({
        $id: employee.$id,
        address: `${employee.first_name} ${employee.last_name}`, // Ensure proper concatenation
      }))
      
      return {
        id: `service_${service?.$id}`,
        label: `Assign Employee for ${service?.services[0]?.name || "Unknown Service"}`, // Added fallback for service name
        type: "select",
        required: true,
        options: options,
      };
    }) || [];
  ;
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

const AdminBookingsForm = ({ onClose, formData, handleAddBookings,loadData }) => {
  const [services, setServices] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Fetch services and employees based on formData.bookingId
  useEffect(() => {
    const fetchData = async () => {
      try {
        setServices(
          formData?.bookingServices?.map((ser) => ({
            ...ser.services, // Spread the properties of ser.services
            bookingId: ser.$id,    // 
          }))
        );        // Fetch employees (assuming you have a function to get them)
        const fetchedEmployees = await fetchAllEmployees();
        if (fetchedEmployees) {
          setEmployees(fetchedEmployees?.response?.documents);
        }
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
          onSubmit={(data) => handleAddBookings(data)}
          loadData={loadData}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AdminBookingsForm;
