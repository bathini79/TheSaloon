import React, { useState, useEffect, useRef } from "react";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
} from "../../components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { ShoppingCart, MapPin, Clock, Plus, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchAllServices } from "@/services/api";
import { useCart } from "@/Context/CartContext";

// Simulated API for fetching services
const fetchServices = async (location, page) => {
  // Hardcoded limit
  const LIMIT = 10;
  const filters = {
    location_ids: [location.$id], // Array for `array-contains`
  };
  // Simulated API call with hardcoded limit
  const { response, error } = await fetchAllServices({
    limit: LIMIT,
    filters,
  });
  if (response) {
    // Calculate if there are more services to load
    const hasMore = response.documents.length > page * LIMIT;
    return {
      services: response.documents.slice((page - 1) * LIMIT, page * LIMIT),
      hasMore,
    };
  } else {
    console.error("Fetch error:", error);
  }
};

const Catalogue = ({
  selectedLocation,
  locations,
  handleGlobalSelectedLocation,
}) => {
  const [services, setServices] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const scrollAnchorRef = useRef(null);
  const navigate = useNavigate(); // Initialize the navigate function
  const { cart, addToCart } = useCart();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchServices(selectedLocation, page);

      if (data) {
        setServices((prev) => {
          const existingIds = new Set(prev.map((service) => service.id));
          const newServices = data.services.filter(
            (service) => !existingIds.has(service.id)
          );
          return [...prev, ...newServices];
        });
        setHasMore(data.hasMore);
      }

      setLoading(false);
    };
    fetchData();
  }, [selectedLocation, page]);

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (scrollAnchorRef.current && hasMore && !loading) {
        const { bottom } = scrollAnchorRef.current.getBoundingClientRect();
        if (bottom <= window.innerHeight) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    }, 300);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  const handleLocationChange = (value) => {
    const selectedLocation = locations.find(
      (location) => location["$id"] === value
    );
    handleGlobalSelectedLocation(selectedLocation);
    setPage(1);
    setServices([]); // Clear services
    setHasMore(true);
  };

  const handleAddToCart = (service) => {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    currentCart.push(service);
    localStorage.setItem("cart", JSON.stringify(currentCart));
    addToCart(service);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow container mx-auto p-4">
        {" "}
        {/* Hero Section */}
        <div
          className="text-center mb-6 bg-cover bg-center p-10 rounded-lg"
          style={{
            backgroundImage:
              "url('https://via.placeholder.com/1200x400?text=Salon+Banner')",
          }}
        >
          <h1 className="text-4xl font-extrabold text-white">
            Welcome to{" "}
            <span style={{ color: "rgba(254, 0, 0, 0.76)" }}>Define Salon</span>
          </h1>
          <p className="text-gray-200 mt-2 text-lg">
            Premium salon services tailored just for you. Experience luxury and
            care.
          </p>
        </div>
        {/* Header with Location Dropdown and Cart */}
        <div className="flex justify-between items-center mb-6">
          <Select
            value={selectedLocation?.["$id"]}
            onValueChange={handleLocationChange}
          >
            <SelectTrigger className="border border-gray-300 rounded-md p-2 flex items-center bg-red-100 text-sm w-full max-w-[300px]">
              <MapPin
                className="mr-2 shrink-0"
                style={{ color: "rgba(254, 0, 0, 0.76)" }}
              />
              <span className="truncate w-full text-left">
                {selectedLocation?.name || "Select a location"}
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select your location</SelectLabel>
                {locations.map((location) => (
                  <SelectItem key={location["$id"]} value={location["$id"]}>
                    {location.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card
              key={service.id}
              className="w-full bg-white shadow-lg rounded-lg hover:scale-105 transition-transform duration-300"
            >
              <CardHeader>
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent>
                <CardTitle>{service.name}</CardTitle>
                <p className="text-sm text-gray-600 flex items-center">
                  <Clock
                    className="mr-2"
                    style={{ color: "rgba(254, 0, 0, 0.76)" }}
                  />
                  Duration: {service.service_time}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="line-through text-gray-500">
                    ₹{service.original_price}
                  </span>
                  <span
                    className="font-bold text-lg"
                    style={{ color: "rgba(254, 0, 0, 0.76)" }}
                  >
                    ₹{service.selling_price}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handleAddToCart(service)}
                  style={{ backgroundColor: "rgba(254, 0, 0, 0.76)" }}
                  className="w-full text-white flex items-center justify-center"
                >
                  <Plus className="mr-2" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        {/* Scroll Anchor */}
        {hasMore && (
          <div ref={scrollAnchorRef} className="mt-4 text-center text-gray-500">
            {loading ? "Loading more services..." : "Scroll down to load more"}
          </div>
        )}
      </div>
      {/* Footer */}
    </div>
  );
};

export default Catalogue;
