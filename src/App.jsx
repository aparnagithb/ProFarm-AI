import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Chatbot from "./Chatbot";
import Login from "./components/Login";
import Register from "./components/Register";
import FarmerProfile from "./components/FarmerProfile";
import FinancialProfile from "./components/FinancialProfile";
import MarketProfile from "./components/MarketProfile";
import Weather from "./components/Weather";
import Home from "./components/Home";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  // ✅ Check localStorage on app load
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUserId(userData.userid);
      setLoggedIn(true);
    }
  }, []);

  // ✅ Called after login/register succeeds
  const handleAuth = (idFromBackend) => {
    setUserId(idFromBackend);
    setLoggedIn(true);

    // Save to localStorage for persistence
    localStorage.setItem("user", JSON.stringify({ userid: idFromBackend }));
  };

  return (
    <Router>
      <Routes>
        {!loggedIn ? (
          <>
            <Route path="/" element={<Login onLogin={handleAuth} />} />
            <Route path="/register" element={<Register onLogin={handleAuth} />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/farmer" element={<FarmerProfile userId={userId} />} />
            <Route path="/financial" element={<FinancialProfile userId={userId} />} />
            <Route path="/marketprofile" element={<MarketProfile userId={userId} />} />
            <Route path="/weather" element={<Weather userId={userId} />} />
            <Route path="/chatbot" element={<Chatbot />} />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
