import { Button } from "@/components/ui/button";

// bookingsTableConfig.js
export const bookingsTableConfig = (actions) => [
  { id: 'status', accessorKey: "status", header: "Status" }, // Enum field for booking status


  {
    id: 'user',
    accessorKey: "user.name", // Assuming `user` is populated with related data
    header: "User",
    cell: ({ row }) => row.original.user?.name || "N/A",
  },

  {
    id: 'location',
    accessorKey: "location.name", // Assuming `location` is populated with related data
    header: "Location",
    cell: ({ row }) => row.original.location?.name || "N/A",
  },

  {
    id: 'actions',
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Button
          onClick={() => actions.handleEdit(row.original)}
          variant="outline"
        >
          Edit
        </Button>
        <Button
          onClick={() => actions.handleDelete(row.original)}
          variant="destructive"
        >
          Delete
        </Button>
      </div>
    ),
  },
];
