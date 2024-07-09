// src/pages/Home.jsx
import React from 'react';
import ParallaxSection from './ParallaxSection';
import "../css/Home.css"
const Home = () => (
  <div>
    <ParallaxSection
      className="box1"
      title="Welcome to Our Site"
      // content="This is the home page content."
      linkTo="/welcome"
    />
    <ParallaxSection
      className="box2"
      title="Our Tours"
      // content="Explore our tours."
      linkTo="/tours"
    />
    <ParallaxSection
      className="box3"
      title="About Us"
      // content="Learn more about us."
      linkTo="/about" // Link to the About page
    />
    <ParallaxSection
      className="box4"
      title="Contact"
      // content="Get in touch with us."
      linkTo="/contact"
    />
  </div>
);

export default Home;
