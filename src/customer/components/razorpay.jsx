import React, { useState } from 'react';

const RazorpayCheckout = () => {
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  // Example booking details (could come from your state)
  const bookingDetails = {
    amount: 500, // Amount in INR (in paise, 500 INR = 50000 paise)
    serviceName: 'Haircut Service',
  };

  const handlePayment = () => {
    setLoading(true);

    // Step 1: Create Razorpay order on the backend (skipped verification)
    fetch('https://your-backend-api-url.com/create-order', { 
      method: 'POST',
      body: JSON.stringify({ amount: bookingDetails.amount, serviceName: bookingDetails.serviceName }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(orderData => {
        const options = {
          key: 'YOUR_RAZORPAY_KEY_ID', // Your Razorpay Key ID
          amount: orderData.amount, // Amount in paise (example: 50000 for 500 INR)
          currency: 'INR',
          name: 'Define Salon',
          description: 'Booking Payment',
          order_id: orderData.order_id, // Razorpay order ID returned by your API
          handler: function(response) {
            // On payment success (skipping verification here)
            updateBookingStatus();  // Update booking status directly
            setPaymentStatus('Payment successful! Your booking is confirmed.');
          },
          prefill: {
            name: 'Customer Name',
            email: 'customer@example.com',
            contact: '1234567890',
          },
          theme: {
            color: '#F37254', // Customize the theme color
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open(); // Open the Razorpay Checkout form
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
  };

  // Step 2: Function to update booking status directly
  const updateBookingStatus = () => {
    // Directly update the booking status here (e.g., update in your state or backend)
    console.log('Booking status updated to confirmed!');
    // Here you could call an API to update the booking status in your backend if needed
  };

  return (
    <div>
      <h2>Book your service</h2>
      <p>Service: {bookingDetails.serviceName}</p>
      <p>Amount: ₹{bookingDetails.amount / 100}</p> {/* Amount is in paise */}
      <button onClick={handlePayment} disabled={loading}>
        {loading ? 'Processing...' : 'Pay with Razorpay'}
      </button>

      {/* Display payment status */}
      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
};

export default RazorpayCheckout;
