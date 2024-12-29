// Suggested code may be subject to a license. Learn more: ~LicenseLog:1428303415.
export const employeeFormConfig = (actions) => {
  return [
    {
      id: "location",
      label: "Location",
      type: "select", // Use select dropdown for location
      options: actions.locations, // This will be populated dynamically from locations
      required: true,
    },
    {
      id: "services",
      label: "Services",
      type: "multi-select", // Multi-select for services
      options: actions.services, // This will be populated dynamically from services
      required: true,
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter employee email",
      required: true,
    },
    {
      id: "first_name",
      label: "First Name",
      type: "text",
      placeholder: "Enter first name",
      required: true,
    },
    {
      id: "last_name",
      label: "Last Name",
      type: "text",
      placeholder: "Enter last name",
      required: true,
    },
    {
      id: "shift_starts_at",
      label: "Shift Starts At",
      type: "time",
      required: true,
    },
    {
      id: "shift_end_at",
      label: "Shift Ends At",
      type: "time",
      required: true,
    },
    {
      id: "available_days",
      label: "Available Days",
      type: "multi-select", // Use select dropdown for location
      options: [
        { $id: "monday", name: "Monday" },
        { $id: "tuesday", name: "Tuesday" },
        { $id: "wednesday", name: "Wednesday" },
        { $id: "thursday", name: "Thursday" },
        { $id: "friday", name: "Friday" },
        { $id: "saturday", name: "Saturday" },
        { $id: "sunday", name: "Sunday" },
      ],
      required: true,
    },
  ];
};
