import React, { useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Dialog,
} from "../../components/ui/dialog";
export default function LocationPopup({
  isOpen,
  setIsOpen,
  locations,
  handleSelectedLocation,
  selectedLocation
}) {
  const handleOnChangeLocation = (event) => {
    const selectedLocation = locations.find(
      (location) => location["$id"] === event.target.value,
    );
    handleSelectedLocation(selectedLocation);
    setIsOpen(false);
  };

  return (
    <div>
      {locations.length>0 ?<Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent>
          <DialogTitle>Choose Your Location</DialogTitle>
          <DialogDescription>
            Please select your location to continue.
          </DialogDescription>
          <div className="mt-4">
            <select
              onChange={handleOnChangeLocation}
              className="w-full border border-gray-300 rounded-md p-2"
              value={selectedLocation?.["$id"] || ""} // Set value to the selectedLocation's $id or empty string if no location selected
              >
              <option value="" disabled>
                Select a location
              </option>
              {locations.map((location, index) => (
                <option key={index} value={location["$id"]}>
                  {location.name ? location.name : location.address}
                </option>
              ))}
            </select>
          </div>
        </DialogContent>
      </Dialog> :  null}
    </div>
  );
}
