import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ServiceForm from "../components/ServiceComponent/ServiceForm";
import { CirclePlus } from "lucide-react";
import { serviceTableConfig } from "../metadata/serviceTableConfig";
import DashboardTable from "@/shared/DynamicTable/DashboardTable";
import { fetchAllServices } from "@/services/api";

const Services = () => {
  const [serviceAdd, setServiceAdd] = useState(false);
  const [reloadData, setReloadData] = useState(false);

  const onClose = () => {
    console.log("true")
    setReloadData(true);
    setTimeout(() => setReloadData(false), 0); // Reset reloadData after triggering
    setServiceAdd(false);
  };

  return (
    <div className="flex flex-col items-center px-6 py-8 min-h-screen bg-gray-50 w-full">
      {/* Header Section */}
      <div className="flex justify-between items-center w-full mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Services</h1>
        <Button onClick={() => setServiceAdd(true)} variant="primary">
          <CirclePlus /> Add Service
        </Button>
      </div>

      {/* Table Section */}
      <div className="w-full bg-white shadow-md rounded-lg p-6">
        <DashboardTable
          fetchDataFunc={fetchAllServices} // Function to fetch data
          columnsConfig={serviceTableConfig()} // Table column configuration
          placeholder="Search for a service..." // Optional search placeholder
          reloadData={reloadData} // Pass the reloadData flag
        />
      </div>

      {/* Add Service Form */}
      {serviceAdd && <ServiceForm onClose={onClose} />}
    </div>
  );
};

export default Services;
