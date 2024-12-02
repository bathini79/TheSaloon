// tableConfig.js
import { Button } from "@/components/ui/button";

export const adminBookingsTableConfig = () => [
  { accessorKey: "name", header: "Name", id: "name" },
  { accessorKey: "address", header: "Address", id: "address" },
  { accessorKey: "phone_number", header: "Phone Number", id: "phone_number" },
  {
    accessorKey: "operational_hours_starts_at",
    header: "Operational Hours Starts At",
    id: "operational_hours_starts_at",
  },
  {
    accessorKey: "operational_hours_ends_at",
    header: "Operational Hours Ends At",
    id: "operational_hours_ends_at",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <Button
        onClick={() => actions.handleEdit(row.original)}
        variant="outline"
      >
        Edit
      </Button>
    ),
  },
];
