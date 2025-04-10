import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await register(formData.name, formData.email, formData.password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <section>
      <h2>Register</h2>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "400px" }}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}
      <p>
        Already have an account? <Link to="/login">Login here.</Link>
      </p>
    </section>
  );
};

export default Register;
