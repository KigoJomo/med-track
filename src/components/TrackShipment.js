import React from "react";

function TrackShipment() {
  return (
    <div className="h-full p-4 ">
      <h2 className="text-2xl font-bold">Track Shipment</h2>
      <div className="p-4 mt-4 bg-white rounded shadow">
        <p>Shipment ID: SH12345</p>
        <p>Current Location: Nairobi</p>
        <p>Temperature: 22°C</p>
        <p>Humidity: 60%</p>
        <div id="map" className="mt-4 h-64 bg-gray-300">
          {" "}
          {/* Embed a map for real-time tracking */}{" "}
        </div>
      </div>
    </div>
  );
}

export default TrackShipment;
