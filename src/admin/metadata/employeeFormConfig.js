export const employeeFormConfig=(actions) => {
  console.log("actions",actions);
  
  return([
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
  ])};
  