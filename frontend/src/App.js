import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Tours from './components/Tours';
import Welcome from './components/Welcome';
import Contact from './components/Contact'; // Import Contact component
import About from './components/About';
import Checkout from './components/Checkout';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import tourVideo from './assets/videos/background.mp4';
import Login from './components/Login';
import Dashboard from './components/Dashboard'; // Your protected component
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import Payment from './components/Payment';
import TourDetails from './components/TourDetails';
// Example data for tours
const tours = [
  { id: 1, name: 'Adventure in the Wild', description: 'Embark on a thrilling journey through untamed landscapes and discover the heart of nature.' },
  { id: 2, name: 'Cultural Odyssey', description: 'Immerse yourself in rich traditions, vibrant festivals, and ancient heritage sites.' },
  { id: 3, name: 'Relaxing Beach Getaway', description: 'Unwind in paradise with pristine beaches, azure waters, and luxurious resorts.' },
  { id: 4, name: 'Mountain Expedition', description: 'Conquer towering peaks, trek through breathtaking vistas, and witness stunning mountain landscapes.' },
  { id: 5, name: 'Historical Wonders Tour', description: 'Explore ancient ruins, royal palaces, and legendary landmarks steeped in history.' },
  { id: 6, name: 'Food and Culinary Adventure', description: 'Savor diverse flavors, local delicacies, and culinary secrets from around the world.' },
];

function App() {
  return (
    <AuthProvider>
      <div className="app">
        {/* Video background section */}
        <div className="video-background">
          <video autoPlay loop muted className="video">
            <source src={tourVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container mt-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tours" element={<Tours />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/contact" element={<Contact />} /> {/* Add Contact route */}
                <Route path="/about" element={<About />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<PrivateRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route path="/payment" element={<PrivateRoute />}>
                  <Route path="/payment" element={<Payment />} />
                </Route>
                <Route path="/tour-details/:tourName" element={<TourDetails />} />
              </Routes>
            </div>
          </div>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
