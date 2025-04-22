import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const OtpVerification = () => {
  const { verifyOtp } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(60);

  useEffect(() => {
    if (!email) navigate("/register");
    const timer = setInterval(() => {
      setResendTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [email, navigate]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await verifyOtp(email, otp);
      navigate("/");
    } catch (err) {
      setError(err.message || "OTP verification failed");
    }
  };

  const handleResend = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "temp", email, password: "resend" }),
      });
      setResendTimer(60);
    } catch (err) {
      console.error("Resend OTP error", err);
    }
  };

  return (
    <section>
      <h2>Verify OTP</h2>
      <form onSubmit={handleSubmit}>
        <label>Enter OTP sent to {email}</label>
        <input
          type="text"
          value={otp}
          onChange={e => setOtp(e.target.value)}
          required
          maxLength={6}
        />
        <button type="submit">Verify</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Didn't receive OTP?{" "}
        <button
          onClick={handleResend}
          disabled={resendTimer > 0}>
          Resend {resendTimer > 0 && `in ${resendTimer}s`}
        </button>
      </p>
    </section>
  );
};

export default OtpVerification;
