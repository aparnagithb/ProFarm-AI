import React from "react";
import AuthForm from "./Authform";

export default function Register({ onLogin }) {
  const handleRegister = async ({ username, password }) => {
    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // send userId and username to App
        onLogin(data.userid);
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error("Register failed", err);
    }
  };

  return <AuthForm mode="register" onSubmit={handleRegister} />;
}
