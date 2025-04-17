import React, { useContext, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../css/Navbar.css';
import { AuthContext } from '../context/AuthContext';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRobot } from '@fortawesome/free-solid-svg-icons';
import logo from './log.png';
import ChatbotModal from './ChatbotModal'; // You’ll create this component

function Navbar() {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => setShowChatbot(!showChatbot);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink exact className="nav-link" to="/" activeClassName="active">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/tours" activeClassName="active">Tours</NavLink>
              </li>

              {/* AI Buddy Icon */}
              <li className="nav-item">
                <button className="btn nav-link ai-buddy-btn" onClick={toggleChatbot}>
                  <FontAwesomeIcon icon={faRobot} /> AI Buddy
                </button>
              </li>

              {isAuthenticated && user ? (
                <li className="nav-item dropdown">
                  <Dropdown>
                    <Dropdown.Toggle className="dropdown-toggle" variant="dark" id="dropdown-basic">
                      <FontAwesomeIcon icon={faUser} /> {user.username}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu">
                      <Dropdown.Item className="dropdown-item" as={NavLink} to="/dashboard">Dashboard</Dropdown.Item>
                      <Dropdown.Item className="dropdown-item" onClick={logout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              ) : (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login" activeClassName="active">Login</NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Chatbot Modal Component */}
      {showChatbot && <ChatbotModal onClose={toggleChatbot} />}
    </>
  );
}

export default Navbar;
