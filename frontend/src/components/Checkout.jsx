import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import pricingData from '../data/pricing';
import '../css/Checkout.css';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const currencyRates = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.75,
  JPY: 110,
  INR: 75,
};

const currencySymbols = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  INR: '₹',
};

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tourName } = location.state;

  const [selectedPrice, setSelectedPrice] = useState(null);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const { isAuthenticated, user } = useContext(AuthContext);

  const lowPrice = pricingData[tourName].low;
  const midPrice = pricingData[tourName].mid;
  const highPrice = pricingData[tourName].high;

  const handlePriceChange = (e) => {
    setSelectedPrice(e.target.value);
  };

  const handlePeopleChange = (e) => {
    setNumberOfPeople(e.target.value);
  };

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  const calculateTotal = () => {
    if (!selectedPrice || numberOfPeople < 1) return 0;
    return (
      pricingData[tourName][selectedPrice] *
      numberOfPeople *
      currencyRates[selectedCurrency]
    );
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      alert('You need to be logged in to proceed to checkout.');
      return;
    }
    const totalAmount = calculateTotal();

    try {
      const response = await axios.post(
        'http://localhost:3000/api/bookings',
        {
          tourName,
          priceTier: selectedPrice,
          numberOfPeople,
          currency: selectedCurrency,
          totalAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      // Navigate to payment gateway or success page
      navigate('/payment');
    } catch (error) {
      console.error('Error during checkout:', error);
      console.log('Error response:', error.response);
      alert('Error during checkout. Please try again.');
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="currency-selection">
        <label>
          Select Currency:
          <select value={selectedCurrency} onChange={handleCurrencyChange}>
            {Object.keys(currencyRates).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="pricing-options">
        <label>
          <input
            type="radio"
            name="price"
            value="low"
            onChange={handlePriceChange}
          />
          Low: {currencySymbols[selectedCurrency]}
          {(lowPrice * currencyRates[selectedCurrency]).toFixed(2)} per person
        </label>
        <label>
          <input
            type="radio"
            name="price"
            value="mid"
            onChange={handlePriceChange}
          />
          Mid: {currencySymbols[selectedCurrency]}
          {(midPrice * currencyRates[selectedCurrency]).toFixed(2)} per person
        </label>
        <label>
          <input
            type="radio"
            name="price"
            value="high"
            onChange={handlePriceChange}
          />
          High: {currencySymbols[selectedCurrency]}
          {(highPrice * currencyRates[selectedCurrency]).toFixed(2)} per person
        </label>
      </div>
      <div className="people-input">
        <label>
          Number of People:
          <input
            type="number"
            value={numberOfPeople}
            min="1"
            onChange={handlePeopleChange}
          />
        </label>
      </div>
      <div className="total">
        Total: {currencySymbols[selectedCurrency]}
        {calculateTotal().toFixed(2)}
      </div>
      <button onClick={handleCheckout} disabled={!isAuthenticated}>
        {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
      </button>
      <div className="disclaimer">
        Prices are not inclusive of taxes or service charges.
      </div>
    </div>
  );
};

export default Checkout;
