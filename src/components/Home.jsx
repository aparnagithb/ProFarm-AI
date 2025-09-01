import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles.css";

export default function Home() {
  const navigate = useNavigate();

  return (
   <div className="home-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Menu</h2>
        <ul>
          <li onClick={() => navigate("/farmer")}>Farmer Profile</li>
          <li onClick={() => navigate("/financial")}>Financial Profile</li>
          <li onClick={() => navigate("/market")}>Market Profile</li>
          <li onClick={() => navigate("/chatbot")}>Chatbot</li>
        </ul>
      </div>

      {/* Main content */}
      <div className="home-container">
        
        <div className="welcome-text">
          <h1>Welcome to Our Farming App</h1>
          <p>Helping farmers connect with technology</p>
        </div>
      </div>
    </div>
  );
}
