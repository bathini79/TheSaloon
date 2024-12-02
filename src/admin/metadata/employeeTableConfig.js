// employeeTableConfig.js
export const employeeTableConfig = () => [
  {
    Header: "First Name",
    accessor: "first_name",
    id: "first_name",
  },
  {
    Header: "Last Name",
    accessor: "last_name",
    id: "last_name",
  },
  {
    Header: "Email",
    accessor: "email",
    id: "email",
  },
  {
    Header: "Location",
    accessor: "location", // Assume you store location's name as part of the employee object,
    id: "location",
  },
  {
    Header: "Services",
    accessor: "services", // Assume you store services as an array of strings or IDs
    id: "services",
  },
  {
    Header: "Shift Starts At",
    accessor: "shift_starts_at",
    id: "shift_starts_at",
  },
  {
    Header: "Shift Ends At",
    accessor: "shift_end_at",
    id: "shift_end_at",
  },
];
