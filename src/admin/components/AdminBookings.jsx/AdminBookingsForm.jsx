import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DynamicForm } from "@/shared/DynamicForm/DynamicForm";
import { locationFormConfig } from "@/admin/metadata/locationFormConfig";
const AdminBookingsForm = ({ onClose, handleAddLocation, formData }) => {
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
          data={formData}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AdminBookingsForm;
