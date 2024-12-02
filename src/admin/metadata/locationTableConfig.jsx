import { Button } from "@/components/ui/button";

// tableConfig.js
export const locationTableConfig = (actions) => [
  { id: 'name', accessorKey: "name", header: "Name" },
  { id: 'address', accessorKey: "address", header: "Address" },
  {
    id: 'operational_hours_starts_at',
    accessorKey: "operational_hours_starts_at",
    header: "Operational Hours Starts At",
  },
  {
    id: 'operational_hours_ends_at',
    accessorKey: "operational_hours_ends_at",
    header: "Operational Hours Ends At",
  },
  {
    id: 'actions',
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
