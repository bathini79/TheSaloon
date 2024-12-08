// adminBookingsFormConfig.js
export const adminBookingsFormConfig = [
  {
    id: "status",
    label: "status",
    type: "select",
    required: true,
    options: [
        "PENDING_PAYMENT",
        "PAYMENT_FAILED",
        "PENDING_CONFIRMATION",
        "CONFIRMED",
        "SERVICE_DONE",
        "CUSTOMER_NO_SHOW",
        "PENDING_REFUND",
        "CANCELLED_BY_ADMIN",
        "CANCELLED_BY_CUSTOMER",
      ].map(i => ({
        address: i,
        $id: i,
      }))
  },
  {
    id: "name",
    label: "User",
    type: "text",
    disabled: true,
  },
  {
    id: "location",
    label: "Location",
    type: "text",
    disabled: true,
  }
];
