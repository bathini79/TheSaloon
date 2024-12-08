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
import { ShoppingCart, MapPin, DollarSign, Clock, Plus, Calendar } from "lucide-react";
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
  const [showCheckout, setShowCheckout] = useState(false);
  const scrollAnchorRef = useRef(null);
  const observer = useRef(null);
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
    addToCart(service);
  };

  const checkout = () => {
    navigate("/customer/cart");
  };

  const viewBookings = () => {
    navigate("/customer/bookings")
  }

  return (
    <div className="flex flex-col min-h-screen">

{/* Header */}
<header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Define Salon
        </h1>
        <div className="flex gap-4">
          <Button
            onClick={viewBookings}
            className="bg-gray-600 hover:bg-gray-700 text-white"
          >
            <Calendar className="mr-2" />
            View Bookings
          </Button>
          <Button
            onClick={checkout}
            style={{
              backgroundColor: "rgba(254, 0, 0, 0.76)",
              position: "relative",
              paddingRight: "1.5rem",
            }}
            className="text-white flex items-center"
          >
            <ShoppingCart className="mr-2" />
            Cart
            {cart.length > 0 && (
              <div
                className="absolute top-0 right-0 flex items-center justify-center rounded-full"
                style={{
                  backgroundColor: "white",
                  color: "rgba(254, 0, 0, 0.76)",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  width: "18px",
                  height: "18px",
                  lineHeight: "18px",
                  textAlign: "center",
                }}
              >
                {cart.length}
              </div>
            )}
          </Button>
        </div>
      </header>
      <div className="flex-grow container mx-auto p-4">      {/* Hero Section */}
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
          <SelectTrigger
            className="border border-gray-300 rounded-md p-1 flex items-center bg-red-100 text-sm"
            style={{ width: "24%" }}
          >
            <MapPin
              className="mr-2"
              style={{ color: "rgba(254, 0, 0, 0.76)" }}
            />
            <span>{selectedLocation?.name}</span>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select your location</SelectLabel>
              {locations.map((location) => {
                return (
                  <>
                    <SelectItem value={location["$id"]}>
                      {location.name}
                    </SelectItem>
                  </>
                );
              })}
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
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; {new Date().getFullYear()} Define Salon. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Catalogue;
