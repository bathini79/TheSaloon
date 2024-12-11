export const serviceFormConfig = (actions)=>{return[
    {
      id: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter service name",
      required: true,
    },
    {
      id: "description",
      label: "Description",
      type: "text",
      placeholder: "Enter description",
      required: true,
    },
    {
      id: "original_price",
      label: "Original Price (₹)",
      type: "number",
      placeholder: "Enter original price",
      required: true,
    },
    {
      id: "selling_price",
      label: "Selling Price (₹)",
      type: "number",
      placeholder: "Enter selling price",
      required: true,
    },
    {
      id: "cancellation_allowed",
      label: "Allow Cancellation?",
      type: "checkbox",
      required: false,
    },
    {
      id: "refund_percentage",
      label: "Refund Percentage",
      type: "number",
      placeholder: "Enter refund percentage",
      required: false,
      dependency: {
        key: "cancellation_allowed", // Depends on this field
        value: true, // Visible/Enabled only if this field is true
        disable: false, // Not just disabled; hidden when the condition is unmet
      },
    },
    {
      id: "location",
      label: "Location",
      type: "multi-select", // Use select dropdown for location
      options: actions.locations, // This will be populated dynamically from locations
      required: true,
    },
  ];
  }