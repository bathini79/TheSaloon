// formConfig.js
export const locationFormConfig = [
  {
    id: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter location name",
    required: true,
  },
  {
    id: "address",
    label: "Address",
    type: "text",
    placeholder: "Enter address",
    required: true,
  },
  {
    id: "operational_hours_starts_at",
    label: "Operational Hours Starts At",
    type: "time",
    required: true,
  },
  {
    id: "operational_hours_ends_at",
    label: "Operational Hours Ends At",
    type: "time",
    required: true,
  },
];
