import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import '../css/Tours.css';

import japanimg from '../assets/images/Japan.jpg';
import spainimg from '../assets/images/Spain.jpg';
import foodWineImg from '../assets/images/FoodWine.jpg';
import historicalImg from '../assets/images/Historical.jpg';
import nationalParksImg from '../assets/images/NationalParks.jpg';
import beachImg from '../assets/images/Beach.jpg';
import europeImg from '../assets/images/Europe.jpg';
import asiaImg from '../assets/images/Asia.jpg';

const Tours = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const navigate = useNavigate(); // Initialize navigate from useNavigate hook

  const handleExpand = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const handleCardClick = (tourName) => {
    // Navigate to checkout page with tour name as a parameter
    navigate('/checkout', {state:{tourName: tourName}});
  };

  return (
    <div className="tours-container tours-page">
      <div
        className={`tour-section country-tours ${expandedSection === 'country-tours' ? 'hovered' : ''}`}
        onMouseEnter={() => setExpandedSection('country-tours')}
        onMouseLeave={() => setExpandedSection(null)}
      >
        <button onClick={() => handleExpand('country-tours')}>Country Tours</button>
        {expandedSection === 'country-tours' && (
          <div className="tour-content">
            <h2>Country Tours</h2>
            <div className="tour-cards">
              <div className="tour-card" onClick={() => handleCardClick('Japan')}>
                <img src={japanimg} alt="Japan" />
                <h3>Japan</h3>
                <p>Discover the beauty of the land of the rising sun with this breathtaking tour.</p>
              </div>
              <div className="tour-card" onClick={() => handleCardClick('Spain')}>
                <img src={spainimg} alt="Spain" />
                <h3>Spain</h3>
                <p>Experience the vibrant life of the country on this exciting tour.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div
        className={`tour-section experience-tours ${expandedSection === 'experience-tours' ? 'hovered' : ''}`}
        onMouseEnter={() => setExpandedSection('experience-tours')}
        onMouseLeave={() => setExpandedSection(null)}
      >
        <button onClick={() => handleExpand('experience-tours')}>Experience Tours</button>
        {expandedSection === 'experience-tours' && (
          <div className="tour-content">
            <h2>Experience Tours</h2>
            <div className="tour-cards">
              <div className="tour-card" onClick={() => handleCardClick('FoodWine')}>
                <img src={foodWineImg} alt="Food and Wine Tour" />
                <h3>Food and Wine Tour</h3>
                <p>Savor the finest wines and gourmet food on this exclusive tour.</p>
              </div>
              <div className="tour-card" onClick={() => handleCardClick('Historical')}>
                <img src={historicalImg} alt="Historical Walks" />
                <h3>Historical Walks</h3>
                <p>Step back in time with our guided historical walks.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div
        className={`tour-section domestic-tours ${expandedSection === 'domestic-tours' ? 'hovered' : ''}`}
        onMouseEnter={() => setExpandedSection('domestic-tours')}
        onMouseLeave={() => setExpandedSection(null)}
      >
        <button onClick={() => handleExpand('domestic-tours')}>Domestic Tours</button>
        {expandedSection === 'domestic-tours' && (
          <div className="tour-content">
            <h2>Domestic Tours</h2>
            <div className="tour-cards">
              <div className="tour-card" onClick={() => handleCardClick('NationalParks')}>
                <img src={nationalParksImg} alt="National Parks Tour" />
                <h3>National Parks Tour</h3>
                <p>Explore the natural wonders within our own country.</p>
              </div>
              <div className="tour-card" onClick={() => handleCardClick('Beaches')}>
                <img src={beachImg} alt="Beach Getaway" />
                <h3>Beach Getaway</h3>
                <p>Relax and unwind at the most beautiful beaches.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div
        className={`tour-section international-tours ${expandedSection === 'international-tours' ? 'hovered' : ''}`}
        onMouseEnter={() => setExpandedSection('international-tours')}
        onMouseLeave={() => setExpandedSection(null)}
      >
        <button onClick={() => handleExpand('international-tours')}>International Tours</button>
        {expandedSection === 'international-tours' && (
          <div className="tour-content">
            <h2>International Tours</h2>
            <div className="tour-cards">
              <div className="tour-card" onClick={() => handleCardClick('Europe')}>
                <img src={europeImg} alt="European Excursion" />
                <h3>European Excursion</h3>
                <p>Travel across Europe and explore its rich heritage and culture.</p>
              </div>
              <div className="tour-card" onClick={() => handleCardClick('Asia')}>
                <img src={asiaImg} alt="Asian Adventures" />
                <h3>Asian Adventures</h3>
                <p>Experience the vibrant cultures and stunning landscapes of Asia.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tours;
