// employeeTableConfig.js
export const employeeTableConfig = (actions) => [

  {
    accessorKey: "first_name",
    id: "first_name",
    header: "First Name",
  },
  {
    header: "Last Name",
    accessorKey: "last_name",
    id: "last_name",
  },
  {
    header: "Email",
    accessorKey: "email",
    id: "email",
  },
  {
    header: "Shift Starts At",
    accessorKey: "shift_starts_at",
    id: "shift_starts_at",
  },
  {
    header: "Shift Ends At",
    accessorKey: "shift_end_at",
    id: "shift_end_at",
  },
];
