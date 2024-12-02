import React, { useEffect, useState } from "react";
import LocationPopup from "../components/LocationPopup";
import { fetchAllLocations } from "@/services/api";
import Catalogue from "../components/Catalogue";

export default function CustomerHome() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState();
  const [locations, setLocations] = useState([]);
  const handleSelectedLocation = (location) => {
    setSelectedLocation(location);
  };

  useEffect(() => {
    // Open the dialog when the component mounts
    const loadLocations = async () => {
      const { response } = await fetchAllLocations();
      setLocations(response.documents);
    };
    loadLocations();
    setIsOpen(true);
  }, []);
  return (
    <>
      {selectedLocation && (
        <Catalogue
          selectedLocation={selectedLocation}
          handleGlobalSelectedLocation={handleSelectedLocation}
          locations={locations}
        />
      )}
      <LocationPopup
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        locations={locations}
        handleSelectedLocation={handleSelectedLocation}
      />
    </>
  );
}
