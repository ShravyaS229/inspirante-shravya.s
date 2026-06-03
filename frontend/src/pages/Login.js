import React, { useState } from "react";
import { login } from "../api";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await login(username, password);

      if (res.status === "ok") {
        localStorage.setItem("token", res.payload.token);
        localStorage.setItem("user", JSON.stringify(res.payload.user));

        setUser(res.payload.user);

        alert("Login successful");
      } else {
        alert(res.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error", err);
      alert("Network error");
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
    </div>
  );
};

export default Login;