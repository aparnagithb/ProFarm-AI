import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const styles = {
    page: {
      fontFamily: "'Poppins', sans-serif",
      margin: 0,
      padding: 0,
      backgroundColor: "#f8f9fa",
      color: "#333",
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    },
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 40px",
      backgroundColor: "#116530",
      color: "white",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    },
    navLogo: {
      fontSize: "22px",
      fontWeight: "bold",
      cursor: "pointer",
    },
    navLinks: {
      display: "flex",
      listStyle: "none",
      gap: "25px",
      margin: 0,
      padding: 0,
    },
    navItem: {
      cursor: "pointer",
      fontWeight: "500",
      transition: "color 0.3s",
    },
    navItemHover: {
      color: "#c8e6c9",
    },
    heroSection: {
      backgroundImage:
        "url('https://images.unsplash.com/photo-1535379453347-1ffd615e2e08?auto=format&fit=crop&w=1500&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "75vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      textAlign: "center",
      padding: "0 20px",
    },
    heroTitle: {
      fontSize: "42px",
      fontWeight: "700",
      marginBottom: "10px",
      textShadow: "1px 1px 5px rgba(0,0,0,0.5)",
    },
    heroText: {
      fontSize: "20px",
      maxWidth: "700px",
      textShadow: "1px 1px 3px rgba(0,0,0,0.4)",
    },
    aboutSection: {
      padding: "60px 20px",
      backgroundColor: "#fff",
      textAlign: "center",
    },
    aboutContainer: {
      maxWidth: "1000px",
      margin: "0 auto",
    },
    aboutTitle: {
      fontSize: "32px",
      fontWeight: "600",
      color: "#2e7d32",
      marginBottom: "20px",
    },
    aboutText: {
      fontSize: "18px",
      lineHeight: "1.7",
      color: "#555",
    },
    aboutImg: {
      width: "100%",
      maxWidth: "900px",
      borderRadius: "12px",
      marginTop: "25px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    },
    footer: {
      backgroundColor: "#2e7d32",
      color: "white",
      textAlign: "center",
      padding: "20px",
      marginTop: "auto",
      fontSize: "15px",
    },
  };

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <div style={styles.navLogo} onClick={() => navigate("/")}>
          🌾 ProFarm
        </div>
        <ul style={styles.navLinks}>
          <li style={styles.navItem} onClick={() => navigate("/farmer")}>
            Farmer Profile
          </li>
          <li style={styles.navItem} onClick={() => navigate("/financial")}>
            Financial Profile
          </li>
          <li style={styles.navItem} onClick={() => navigate("/marketprofile")}>
            Markets
          </li>
          <li style={styles.navItem} onClick={() => navigate("/weather")}>
            Weather
          </li>
          <li style={styles.navItem} onClick={() => navigate("/chatbot")}>
            Chatbot
          </li>
        </ul>
      </div>

      {/* Hero Section */}
      <div style={styles.heroSection}>
        <h1 style={styles.heroTitle}>Empowering Farmers with Smart AI Guidance</h1>
        <p style={styles.heroText}>
          
        </p>
      </div>

      {/* About Section */}
      <div style={styles.aboutSection}>
        <div style={styles.aboutContainer}>
          <h2 style={styles.aboutTitle}>About ProFarm</h2>
          <p style={styles.aboutText}>
            ProFarm AI is transforming agriculture with the power of artificial intelligence. Our virtual agents, built on cutting-edge large language models (LLMs), act as digital farm advisors — guiding farmers through challenges like crop selection, pest control, financial planning, and market forecasting
          </p>
          <img
            src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1500&q=80"
            alt="About farming"
            style={styles.aboutImg}
          />
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        © {new Date().getFullYear()} SmartFarm — Empowering Farmers with
        Technology 🌱
      </div>
    </div>
  );
}
