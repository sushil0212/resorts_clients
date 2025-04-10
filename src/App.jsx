import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import RoomDetail from "./pages/RoomDetail";
import Book from "./pages/Book";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminPanel from "./pages/AdminPanel";
import AddRoom from "./pages/AddRoom";
import Footer from "./components/Footer";

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
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
