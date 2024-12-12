import { Button } from "@/components/ui/button";

// bookingsTableConfig.js
export const bookingsTableConfig = (actions) => [
  { id: 'status', accessorKey: "status", header: "Status" }, // Enum field for booking status


  {
    id: 'user',
    accessorFn: (row) => console.log(row) ,// Use accessorFn for custom access logic
    header: "User",
    // cell: ({ row }) => row.getValue(), // Access the value processed by accessorFn
  },

  {
    id: 'location',
    accessorFn: (row) => row?.location?.[0]?.name || "N/A", // Same for location
    header: "Location",
    // cell: ({ row }) => row.getValue(), // Access the value processed by accessorFn
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

      </div>
    ),
  },
];
