import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DynamicForm } from "@/shared/DynamicForm/DynamicForm";
import { serviceFormConfig } from "@/admin/metadata/serviceFormConfig";
import { useToast } from "@/hooks/use-toast";
import { createService, fetchAllLocations, uploadFile } from "@/services/api"; // Ensure uploadFile is imported

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
    const clonedData = structuredClone(data); // Create a deep copy of the input data

    // Process file uploads
    const fileUploadPromises = Object.keys(clonedData)
      .filter((key) => clonedData[key] instanceof File) // Check for file fields
      .map(async (key) => {
        try {
          const uploadedFile = await uploadFile(clonedData[key]); // Upload file
          clonedData[key] = uploadedFile.url; // Replace file with the uploaded URL
        } catch (error) {
          toast({
            title: `Failed to upload ${key}`,
            description: error.message,
            variant: "destructive",
          });
          throw error; // Stop execution on upload failure
        }
      });

    try {
      await Promise.all(fileUploadPromises); // Wait for all uploads to complete

      // Map location field
      clonedData.location_ids = clonedData.location;
      delete clonedData.location;

      const { response, error } = await createService(clonedData);
      if (response) {
        toast({ title: "Successfully added service" });
        onClose(); // Close dialog after successful submission
      } else {
        toast({ title: error, variant: "destructive" });
      }
    } catch (error) {
      console.error("File upload failed:", error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Service</DialogTitle>
        </DialogHeader>
        <DynamicForm
          formConfig={serviceFormConfig({ locations })}
          onSubmit={handleAddService}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ServiceForm;
