import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import LocationForm from "../components/LocationComponent/LocationForm";
import { CirclePlus } from "lucide-react";
import { locationTableConfig } from "../metadata/locationTableConfig";
import { fetchAllLocations } from "@/services/api";
import DashboardTable from "@/shared/DynamicTable/DashboardTable";

const Locations = () => {
  const [locationAdd, setLocationAdd] = useState(false);
  const [reloadData, setReloadData] = useState(false);

  const onClose = () => {
    setLocationAdd(false);
    setReloadData(true);
  };

  return (
    <div className="flex flex-col items-center px-6 py-8 min-h-screen bg-gray-50 w-full">
      {/* Header Section */}
      <div className="flex justify-between items-center w-full mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Locations</h1>
        <Button onClick={() => setLocationAdd(true)}>
          <CirclePlus /> Add Location
        </Button>
      </div>

      {/* Table Section */}
      <div className="w-full bg-white shadow-md rounded-lg p-6">
        <DashboardTable
          fetchDataFunc={fetchAllLocations} // Function to fetch data
          columnsConfig={locationTableConfig} // Table column configuration
          placeholder="Search for a location..." // Optional search placeholder
          reloadData={reloadData} // Pass the reloadData flag
        />
      </div>

      {/* Add Location Form */}
      {locationAdd && <LocationForm onClose={onClose} />}
    </div>
  );
};

export default Locations;
