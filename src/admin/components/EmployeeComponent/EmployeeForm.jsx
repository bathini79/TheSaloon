import { useEffect, useState } from "react";
import { createEmployee, fetchAllLocations } from "@/services/api"; // Assuming this function fetches all locations
import { fetchAllServices } from "@/services/api"; // Assuming this function fetches all services
import { employeeFormConfig } from "@/admin/metadata/employeeFormConfig";
import { DynamicForm } from "@/shared/DynamicForm/DynamicForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
const EmployeeForm = ({ onClose }) => {
  const [locations, setLocations] = useState([]);
  const [services, setServices] = useState([]);
  const { toast } = useToast();

  // Fetch locations and services on component mount
  useEffect(() => {
    const loadLocations = async () => {
      const { response } = await fetchAllLocations();
      setLocations(response.documents);
    };

    const loadServices = async () => {
      const { response } = await fetchAllServices();
      setServices(response.documents);
    };

    loadLocations();
    loadServices();
  }, []);

  const handleAddEmployee = async (data) => {
    const { response, error } = await createEmployee(data);
    if (response) {
      toast({
        variant: "success",
                title: "Successfully added employee",
      });
      await onClose(); // Close dialog after successful submission
    } else {
      toast({
        title: error,
        variant: "destructive",
      });
    }
  };

  return locations?.length>1 && services?.length>1 ? (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Employee</DialogTitle>
        </DialogHeader>
        <DynamicForm
          formConfig={employeeFormConfig({ locations, services })}
          onSubmit={handleAddEmployee}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  ) : null;
};

export default EmployeeForm;
