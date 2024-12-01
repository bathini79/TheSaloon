// serviceTableConfig.js
export const serviceTableConfig = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "description", header: "Description" },
    { accessorKey: "original_price", header: "Original Price (₹)", type: "integer" },
    { accessorKey: "selling_price", header: "Selling Price (₹)", type: "integer" },
    { accessorKey: "cancellation_allowed", header: "Cancellation Allowed", type: "boolean" },
    { accessorKey: "refund_percentage", header: "Refund Percentage", type: "percentage" },
  ];
  