// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CreateShipment from "./components/CreateShipment";
import TrackShipment from "./components/TrackShipment";
import VerifyMedication from "./components/VerifyMedication";

import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create-shipment" element={<CreateShipment />} />
          <Route path="track-shipment" element={<TrackShipment />} />
          <Route path="verify-medication" element={<VerifyMedication />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
