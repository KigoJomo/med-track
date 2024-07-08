import React, { useState, useEffect } from "react";
import MapBoxComponent from "./MapComponents/MapboxComponent";

function TrackShipment() {
  const [shipmentsData, setShipmentsData] = useState([]);
  const [shipmentDetails, setShipmentDetails] = useState(null);

  useEffect(() => {
    fetch("./shipments.json")
      .then((response) => response.json())
      .then((data) => setShipmentsData(data))
      .catch((error) => console.error(`Error fetching shipment data:`, error));
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const shipmentId = event.target.search.value;

    // Fetch shipment details from the local JSON file
    const fetchedDetails = shipmentsData.find(
      (entry) => entry.id === shipmentId
    );

    if (fetchedDetails) {
      const shipment = {
        id: fetchedDetails.id,
        status: fetchedDetails.status,
        temperature: fetchedDetails.temperature,
        humidity: fetchedDetails.humidity,
        qaOfficer: fetchedDetails.qaOfficer,
        currentLocation: [
          parseFloat(fetchedDetails.currentLocation.location.longitude),
          parseFloat(fetchedDetails.currentLocation.location.latitude),
        ],
        destination: [
          parseFloat(fetchedDetails.destination.location.longitude),
          parseFloat(fetchedDetails.destination.location.latitude),
        ],
        manufacturer: [
          parseFloat(fetchedDetails.manufacturer.location.longitude),
          parseFloat(fetchedDetails.manufacturer.location.latitude),
        ],
        timeline: fetchedDetails.transactionHistory.map((event) => ({
          event: event.event,
          date: event.dateTime,
          location: event.location,
        })),
      };

      console.log(shipment);

      setShipmentDetails(shipment);
    } else {
      setShipmentDetails(null);
    }
  };

  return (
    <section className="shadow-xl w-full h-full flex items-center gap-0 rounded-xl overflow-hidden">
      <div className="details h-full w-2/5 bg-slate-100 px-8 py-6 flex flex-col items-start gap-4 shadow-3xl border-r-2">
        <form
          className="w-full flex items-center gap-2 relative"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            name="search"
            id="search"
            required
            placeholder="Enter Shipment ID"
            className="text-gray-800 text-sm rounded-full pl-12 py-2 bg-slate-200 w-full outline-none border-2 border-transparent focus:bg-white focus:outline-none focus:border-indigo-600 transition-all"
          />
          <span className="material-symbols-outlined absolute text-xl text-gray-600 left-4">
            search
          </span>
          <button
            type="submit"
            className="max-h-full px-2 bg-indigo-600 text-white text-2xl rounded-full hover:bg-indigo-500"
          >
            &#x279B;
          </button>
        </form>

        {shipmentDetails && (
          <>
            <div className="w-full  px-2 flex flex-col gap-4 overflow-item">
              <h3 className="capitalize text-xl text-slate-950">
                {shipmentDetails.id}
              </h3>

              <p>status: {shipmentDetails.status} </p>
              <p>temperature: {shipmentDetails.temperature} </p>
              <p>humidity: {shipmentDetails.humidity} </p>
              <p>qaOfficer: {shipmentDetails.qaOfficer} </p>
              <p>
                currentLocation: {shipmentDetails.currentLocation[0]}{" __ "}
                {shipmentDetails.currentLocation[1]}{" "}
              </p>
              <p>
                destination: {shipmentDetails.destination[0]}{" __ "}
                {shipmentDetails.destination[1]}{" "}
              </p>
              <p>
                manufacturer: {shipmentDetails.manufacturer[0]}{" __ "}
                {shipmentDetails.manufacturer[1]}{" "}
              </p>
              <div>
                <h4 className="text-lg text-slate-800 font-semibold">Timeline:</h4>
                {shipmentDetails.timeline.map((event, index) => (
                  <div key={index}>
                    <p>Event: {event.event}</p>
                    <p>Date: {event.date}</p>
                    <p>Location: {event.location}</p>
                    <hr/>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div
        id="map"
        className="h-full w-3/5 border-8 border-l-0 border-slate-100 rounded-lg rounded-l-none bg-slate-100"
      >
        <MapBoxComponent shipmentDetails={shipmentDetails} />
      </div>
    </section>
  );
}

export default TrackShipment;
