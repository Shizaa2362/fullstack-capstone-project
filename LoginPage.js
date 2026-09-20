import React, { useState } from "react";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + btoa(username + ":" + password)
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Login successful");
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred during login");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default LoginPage;
