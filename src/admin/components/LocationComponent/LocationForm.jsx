import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DynamicForm } from "@/shared/DynamicForm/DynamicForm";
import { locationFormConfig } from "@/admin/metadata/locationFormConfig";
import { createLocation } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
const LocationForm = ({ onClose }) => {
  const { toast } = useToast()
  const handleAddLocation = async (data) => {
    const { response, error } = await createLocation(data);
    if (response) {
      toast({
        title: "Successfully added location",
      });
     await onClose(); // Close dialog after successful submission
    } else {
      toast({
        title:  error,
        variant: "destructive",
      });
    }
  };
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Location</DialogTitle>
        </DialogHeader>
        <DynamicForm
          formConfig={locationFormConfig}
          onSubmit={handleAddLocation}
          onClose={() => onClose()}
        />
      </DialogContent>
    </Dialog>
  );
};

export default LocationForm;
