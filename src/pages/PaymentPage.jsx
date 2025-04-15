/* // pages/PaymentPage.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentPage = () => {
  const location = useLocation();
  const allData = location.state; // Contains booking and client details
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!allData) return <p>Missing booking details. Please start over.</p>;

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!stripe || !elements) {
      setMessage("Stripe has not loaded properly.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    // Create a PaymentMethod using the card details
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: `${allData.firstName} ${allData.lastName}`,
      },
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    try {
      // Call your backend API to create booking and process payment.
      await axios.post(`${import.meta.env.VITE_API_URL}/bookings`, {
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
        paymentMethodId: paymentMethod.id,
      });
      setMessage("✅ Booking confirmed and payment successful!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
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
      {message && <p>{message}</p>}
    </form>
  );
};

export default PaymentPage;
 */

// src/pages/PaymentPage.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentPage = () => {
  // Retrieve booking & client details passed from previous steps
  const location = useLocation();
  const allData = location.state;
  const stripe = useStripe();
  const elements = useElements();

  // Local component states for loading, messages, and booking ID.
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [bookingId, setBookingId] = useState("");

  if (!allData) return <p>Missing booking details. Please start over.</p>;

  // Handle payment submission
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setBookingId("");

    if (!stripe || !elements) {
      setMessage("Stripe has not loaded properly.");
      setLoading(false);
      return;
    }

    try {
      // 1. Request a PaymentIntent from the backend.
      // The backend endpoint /create-payment-intent returns a clientSecret
      const { data: piData } = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-payment-intent`,
        { amount: allData.totalPrice * 100 } // convert dollars to cents
      );
      const clientSecret = piData.clientSecret;

      // 2. Use Stripe to confirm card payment. This will trigger 3D Secure if needed.
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
        // Payment failure – display error message.
        setMessage(`❌ ${result.error.message}`);
      } else if (result.paymentIntent.status === "succeeded") {
        // 3. Payment succeeded. Now create the booking on your backend.
        const bookingRes = await axios.post(
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
            // Use the confirmed PaymentIntent id for the booking
            paymentIntentId: result.paymentIntent.id,
          }
        );
        // Update state with booking ID and success message.
        setMessage("✅ Booking confirmed and payment successful!");
        setBookingId(bookingRes.data.booking._id);
      } else {
        setMessage(
          "Payment not successful. Status: " + result.paymentIntent.status
        );
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Payment failed. Please try again.");
    }
    setLoading(false);
  };

  // Handle cancellation – calls your DELETE /bookings/:bookingId endpoint
  const handleCancelBooking = async () => {
    if (!bookingId) {
      alert("No booking available to cancel!");
      return;
    }
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking and receive a refund?"
    );
    if (!confirmCancel) return;

    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/bookings/${bookingId}`
      );
      setMessage(res.data.message);
      setBookingId(""); // Clear the booking id after cancellation
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to cancel booking.");
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
        {message && <p>{message}</p>}
      </form>
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
