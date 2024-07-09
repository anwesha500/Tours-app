import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Payment.css';
const Payment = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const paymentProcess = setTimeout(() => {
      alert('Payment successful!');
      navigate('/dashboard');
    }, 3000); // Simulate a 3-second delay for the payment process

    return () => clearTimeout(paymentProcess); // Cleanup timeout on component unmount
  }, [navigate]);

  return (
    <div className="payment-container">
      <h2>Processing Payment</h2>
      <p>Please wait while we process your payment...</p>
    </div>
  );
};

export default Payment;
