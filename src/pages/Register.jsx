/* import React, { useState, useContext } from "react";
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
 */

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState("register"); // register | otp
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [emailForOtp, setEmailForOtp] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        formData
      );
      if (res.data.message === "OTP sent to your email") {
        setStep("otp");
        setEmailForOtp(formData.email);
        startCountdown();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  const handleOtpVerify = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/verify-otp`,
        { email: emailForOtp, otp }
      );
      if (res.data.message === "OTP verified successfully") {
        alert("Registration successful! You can now log in.");
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    }
  };

  const startCountdown = () => {
    setResendDisabled(true);
    let timeLeft = 60;
    setCountdown(timeLeft);
    const interval = setInterval(() => {
      timeLeft--;
      setCountdown(timeLeft);
      if (timeLeft === 0) {
        clearInterval(interval);
        setResendDisabled(false);
      }
    }, 1000);
  };

  const handleResendOtp = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/resend-otp`, {
        email: emailForOtp,
      });
      startCountdown();
      setError("");
    } catch (err) {
      setError("Failed to resend OTP.");
    }
  };

  return (
    <section>
      <h2>{step === "register" ? "Register" : "Verify OTP"}</h2>

      {step === "register" ? (
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
      ) : (
        <form
          onSubmit={handleOtpVerify}
          style={{ maxWidth: "400px" }}>
          <label>Enter the OTP sent to your email:</label>
          <input
            type="text"
            name="otp"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            required
          />
          <button type="submit">Verify OTP</button>
          <div style={{ marginTop: "10px" }}>
            {resendDisabled ? (
              <p>Resend available in {countdown}s</p>
            ) : (
              <button
                type="button"
                onClick={handleResendOtp}>
                Resend OTP
              </button>
            )}
          </div>
        </form>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {step === "register" && (
        <p>
          Already have an account? <Link to="/login">Login here.</Link>
        </p>
      )}
    </section>
  );
};

export default Register;
