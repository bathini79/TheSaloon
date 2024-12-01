// employeeTableConfig.js
export const employeeTableConfig = [
    {
      Header: "First Name",
      accessor: "first_name",
    },
    {
      Header: "Last Name",
      accessor: "last_name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Location",
      accessor: "location", // Assume you store location's name as part of the employee object
    },
    {
      Header: "Services",
      accessor: "services", // Assume you store services as an array of strings or IDs
    },
    {
      Header: "Shift Starts At",
      accessor: "shift_starts_at",
    },
    {
      Header: "Shift Ends At",
      accessor: "shift_end_at",
    },
  ];
  