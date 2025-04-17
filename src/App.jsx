// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import RoomDetail from "./pages/RoomDetail";
import Book from "./pages/Book"; // Book component fetches room then renders BookingForm
import ClientDetails from "./pages/ClientDetails";
import PaymentPage from "./pages/PaymentPage";
import MyBookings from "./pages/MyBookings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminPanel from "./pages/AdminPanel";
import AddRoom from "./pages/AddRoom";
import CancelBooking from "./pages/CancelBooking";
import Footer from "./components/Footer";
import EditRoom from "./pages/EditRoom"; // ← ADD THIS

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/rooms"
            element={<Rooms />}
          />
          <Route
            path="/rooms/:roomId"
            element={<RoomDetail />}
          />
          <Route
            path="/book/:roomId"
            element={<Book />}
          />
          <Route
            path="/client-details"
            element={<ClientDetails />}
          />
          <Route
            path="/payment"
            element={<PaymentPage />}
          />
          <Route
            path="/my-bookings"
            element={<MyBookings />}
          />
          <Route
            path="/cancel-booking"
            element={<CancelBooking />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/admin"
            element={<AdminPanel />}
          />
          <Route
            path="/admin/add-room"
            element={<AddRoom />}
          />
          <Route
            path="/admin/edit-room/:roomId"
            element={<EditRoom />}
          />{" "}
          // ← ADD THIS ROUTE
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
