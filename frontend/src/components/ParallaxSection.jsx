import React from 'react';
import { Link } from 'react-router-dom';
import '../css/ParallaxSection.css'; // Import additional CSS for ParallaxSection styling

const ParallaxSection = ({ className, title, content, linkTo }) => (
  <div className={`parallax ${className}`}>
    <div className="content-title">
      {linkTo ? (
        <Link to={linkTo} className="title-link">
          <span className="title">{title}</span>
        </Link>
      ) : (
        <span className="title">{title}</span>
      )}
    </div>
    <p className="section-content">{content}</p>
  </div>
);

export default ParallaxSection;
