import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

import user_icon from "../assets/person.png";
import password_icon from "../assets/password.png";

export default function Authform({ mode, onSubmit }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="header">
          <div className="text">
            {mode === "login" ? "Login" : "Sign Up"}
          </div>
          <div className="underline"></div>
        </div>

        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="User" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input">
            <img src={password_icon} alt="Password" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="submit-container">
          <button type="submit" className="submit">
            {mode === "login" ? "Login" : "Sign Up"}
          </button>

          {mode === "login" ? (
            <Link to="/register" className="submit alt-submit">
              Register
            </Link>
          ) : (
            <Link to="/" className="submit alt-submit">
              Login
            </Link>
          )}
        </div>
      </form>
    </div>
  );
}
