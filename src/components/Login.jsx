import React from "react";
import AuthForm from "./Authform";

export default function Login({ onLogin }) {
  const handleLogin = async ({ username, password }) => {
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
          localStorage.setItem("user", JSON.stringify(data)); // save user

        // send userId and username to App
        onLogin(data.userid);
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return <AuthForm mode="login" onSubmit={handleLogin} />;
}
