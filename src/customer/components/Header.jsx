import { Button } from '@/components/ui/button';
import { useCart } from '@/Context/CartContext';
import { ShoppingCart,Calendar } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate= useNavigate()
    const checkout = () => {
        navigate("/customer/cart");
      };
    
      const viewBookings = () => {
        navigate("/customer/bookings");
      };
  const { cart } = useCart();

  return (
    <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold" onClick={()=>navigate("/")} style={{cursor:"pointer"}}>Define Salon</h1>
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
  )
}

export default Header