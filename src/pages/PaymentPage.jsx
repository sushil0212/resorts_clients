// src/pages/PaymentPage.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentPage = () => {
  const location = useLocation();
  const allData = location.state; // booking + client details
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [bookingId, setBookingId] = useState("");

  if (!allData) return <p>Missing booking details. Please start over.</p>;

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setBookingId("");

    if (!stripe || !elements) {
      setMessage("Stripe has not loaded properly.");
      return setLoading(false);
    }

    // ── STEP 1: Request a PaymentIntent ───────────────────────────
    let clientSecret;
    const cents = allData.totalPrice * 100;
    console.log("▶︎ STEP 1: sending amount in cents:", cents);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-payment-intent`,
        { amount: cents }
      );
      clientSecret = data.clientSecret;
      console.log("✅ STEP 1: received clientSecret:", clientSecret);
    } catch (err) {
      console.error(
        "❌ STEP 1 Error (create-payment-intent):",
        err.response?.data || err.message
      );
      setMessage(
        "Error initiating payment: " +
          (err.response?.data?.error ||
            err.response?.data?.message ||
            err.message)
      );
      return setLoading(false);
    }

    // ── STEP 2: Confirm Card Payment ─────────────────────────────
    let paymentIntent;
    try {
      const cardElement = elements.getElement(CardElement);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${allData.firstName} ${allData.lastName}`,
          },
        },
      });
      if (result.error) {
        console.error("❌ STEP 2 Error (confirmCardPayment):", result.error);
        setMessage("Payment failed: " + result.error.message);
        return setLoading(false);
      }
      paymentIntent = result.paymentIntent;
      console.log("✅ STEP 2: paymentIntent status:", paymentIntent.status);

      if (paymentIntent.status !== "succeeded") {
        setMessage("Payment not successful. Status: " + paymentIntent.status);
        return setLoading(false);
      }
    } catch (err) {
      console.error("❌ STEP 2 Exception:", err);
      setMessage("Payment confirmation error: " + err.message);
      return setLoading(false);
    }

    // ── STEP 3: Create Booking Record ────────────────────────────
    try {
      console.log("▶︎ STEP 3: creating booking with data:", {
        userId: allData.userId,
        roomId: allData.roomId,
        startDate: allData.startDate,
        endDate: allData.endDate,
        totalPrice: allData.totalPrice,
        clientDetails: allData,
        paymentIntentId: paymentIntent.id,
      });

      const { data: bookingRes } = await axios.post(
        `${import.meta.env.VITE_API_URL}/bookings`,
        {
          userId: allData.userId,
          roomId: allData.roomId,
          startDate: allData.startDate,
          endDate: allData.endDate,
          totalPrice: allData.totalPrice,
          clientDetails: {
            firstName: allData.firstName,
            lastName: allData.lastName,
            age: allData.age,
            country: allData.country,
            mobile: allData.mobile,
          },
          paymentIntentId: paymentIntent.id,
        }
      );

      console.log("✅ STEP 3: booking created:", bookingRes.booking);
      setMessage("✅ Booking confirmed and payment successful!");
      setBookingId(bookingRes.booking._id);
    } catch (err) {
      console.error(
        "❌ STEP 3 Error (creating booking):",
        err.response?.data || err.message
      );
      setMessage(
        "Booking failed: " +
          (err.response?.data?.message ||
            err.response?.data?.error ||
            err.message)
      );
      return setLoading(false);
    }

    setLoading(false);
  };

  const handleCancelBooking = async () => {
    if (!bookingId) return alert("No booking to cancel!");
    if (!window.confirm("Cancel booking and refund?")) return;

    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/bookings/${bookingId}`
      );
      console.log("✅ Booking cancelled:", data);
      setMessage(data.message);
      setBookingId("");
    } catch (err) {
      console.error(
        "❌ Error cancelling booking:",
        err.response?.data || err.message
      );
      setMessage(
        "Failed to cancel booking: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div>
      <form
        className="form"
        onSubmit={handleSubmit}>
        <h2>Payment Information</h2>
        <CardElement options={{ hidePostalCode: true }} />
        <button
          type="submit"
          disabled={!stripe || loading}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>

      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}

      {bookingId && (
        <div style={{ marginTop: "1rem" }}>
          <p>
            Your Booking ID: <strong>{bookingId}</strong>
          </p>
          <button onClick={handleCancelBooking}>Cancel Booking</button>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
