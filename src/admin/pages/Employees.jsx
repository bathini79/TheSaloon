import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import EmployeeForm from "../components/EmployeeComponent/EmployeeForm";
import { CirclePlus } from "lucide-react";
import { employeeTableConfig } from "../metadata/employeeTableConfig";
import DashboardTable from "@/shared/DynamicTable/DashboardTable";
import { fetchAllEmployees, fetchAllLocations } from "@/services/api"; // Assuming you have an API function for fetching employees
const Employees = () => {
    const [employeeAdd, setEmployeeAdd] = useState(false);
    const [reloadData, setReloadData] = useState(false);
  
    const onClose = () => {
      setReloadData(true); // Trigger reload after adding a new employee
      setEmployeeAdd(false);
    };

    const handleEdit = (location) => {
      location.name = location.user.name
      location.location = location.location.name
        // Your logic for editing the location goes here
    };
  
    return (
      <div className="flex flex-col items-center px-6 py-8 min-h-screen bg-gray-50 w-full">
        {/* Header Section */}
        <div className="flex justify-between items-center w-full mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Employees</h1>
          <Button onClick={() => setEmployeeAdd(true)} variant="primary">
            <CirclePlus /> Add Employee
          </Button>
        </div>
  
        {/* Table Section */}
        <div className="w-full bg-white shadow-md rounded-lg p-6">
          <DashboardTable
            fetchDataFunc={fetchAllEmployees} // Function to fetch data
            columnsConfig={employeeTableConfig({handleEdit})} // Table column configuration
            placeholder="Search for an employee..." // Optional search placeholder
            reloadData={reloadData} // Pass the reloadData flag
          />
        </div>
  
        {/* Add Employee Form */}
        {employeeAdd && <EmployeeForm onClose={onClose} />}
      </div>
    );
  };
  
  export default Employees;
  