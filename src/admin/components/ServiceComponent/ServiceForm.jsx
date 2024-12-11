import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DynamicForm } from "@/shared/DynamicForm/DynamicForm";
import { serviceFormConfig } from "@/admin/metadata/serviceFormConfig";
import { useToast } from "@/hooks/use-toast";
import { createService, fetchAllLocations } from "@/services/api";

const ServiceForm = ({ onClose }) => {
  const { toast } = useToast();
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    const loadLocations = async () => {
      const { response } = await fetchAllLocations();
      setLocations(response.documents);
    };

    loadLocations();
  }, []);

  const handleAddService = async (data) => {
    data.location_ids = data.location.map(l=>l.$id)
    delete data.locations
    const { response, error } = await createService(data);
    if (response) {
      toast({ title: "Successfully added service" });
      onClose(); // Close dialog after successful submission
    } else {
      toast({ title: error, variant: "destructive" });
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Service</DialogTitle>
        </DialogHeader>
        <DynamicForm
          formConfig={serviceFormConfig({locations})}
          onSubmit={handleAddService}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ServiceForm;
