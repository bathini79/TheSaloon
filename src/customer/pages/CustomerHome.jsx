import React, { useEffect, useState } from "react";
import LocationPopup from "../components/LocationPopup";
import { fetchAllLocations } from "@/services/api";
import Catalogue from "../components/Catalogue";
import { useCart } from "@/Context/CartContext";

export default function CustomerHome() {
  const [isOpen, setIsOpen] = useState(false);
  const [locations, setLocations] = useState([]);
  const {selectedLocation,setSelectedLocation} = useCart({})
  const handleSelectedLocation = (location) => {
    localStorage.setItem("selectedLocation", JSON.stringify(location));
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
      {!selectedLocation ?<LocationPopup
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        locations={locations}
        handleSelectedLocation={handleSelectedLocation}
        selectedLocation={selectedLocation}
      /> :  null}
    </>
  );
}
