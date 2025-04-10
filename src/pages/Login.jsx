import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = e =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login(credentials.email, credentials.password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <section>
      <h2>Login</h2>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "400px" }}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
      <p>
        Don’t have an account? <Link to="/register">Register here.</Link>
      </p>
    </section>
  );
};

export default Login;
