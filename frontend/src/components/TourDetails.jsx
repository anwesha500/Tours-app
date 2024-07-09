import React from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import tourDetails from '../data/tourdetails'; // Import your tour details data
import '../css/TourDetails.css'; // Import your custom styles for TourDetails page

const TourDetails = () => {
  const { tourName } = useParams(); // Get the tourName from URL params

  if (!tourDetails[tourName]) {
    // Handle case where tourName does not exist in your data (optional)
    return <div className="tour-details-container">Tour details not found!</div>;
  }

  const { low, mid, high } = tourDetails[tourName];

  // Slick settings for the carousel
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="tour-details-container">
      <h2>{tourName} Tour Details</h2>
      <Slider {...carouselSettings} className="tour-details-carousel">
        <div className="tier-details">
          <h3>Low Tier</h3>
          <p>Number of Days: {low.numberOfDays}</p>
          <p>Number of Nights: {low.numberOfNights}</p>
          <p>Activities: {low.activities.join(', ')}</p>
        </div>
        <div className="tier-details">
          <h3>Mid Tier</h3>
          <p>Number of Days: {mid.numberOfDays}</p>
          <p>Number of Nights: {mid.numberOfNights}</p>
          <p>Activities: {mid.activities.join(', ')}</p>
        </div>
        <div className="tier-details">
          <h3>High Tier</h3>
          <p>Number of Days: {high.numberOfDays}</p>
          <p>Number of Nights: {high.numberOfNights}</p>
          <p>Activities: {high.activities.join(', ')}</p>
        </div>
      </Slider>
    </div>
  );
};

export default TourDetails;
