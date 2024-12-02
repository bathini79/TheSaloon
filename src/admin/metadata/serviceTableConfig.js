// serviceTableConfig.js
export const serviceTableConfig = () => [
    { accessorKey: "name", header: "Name", id: "name" },
    { accessorKey: "description", header: "Description", id: "description" },
    {
        accessorKey: "original_price",
        header: "Original Price (₹)",
        type: "integer",
        id: "original_price"
    },
    {
        accessorKey: "selling_price",
        header: "Selling Price (₹)",
        type: "integer",
        id: "selling_price"
    },
    {
        accessorKey: "cancellation_allowed",
        header: "Cancellation Allowed",
        type: "boolean",
        id: "cancellation_allowed"
    },
    {
        accessorKey: "refund_percentage",
        header: "Refund Percentage",
        type: "percentage",
        id: "refund_percentage"
    },
];
