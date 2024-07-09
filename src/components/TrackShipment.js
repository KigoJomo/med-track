import React, { useState, useEffect } from "react";
import MapBoxComponent from "./MapComponents/MapboxComponent";
import { FormatDate } from "./Components";

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
        estimatedDelivery: fetchedDetails.estimatedDelivery,
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
      <div className="details h-full w-2/5 bg-slate-100 px-8 py-6 flex flex-col items-start justify-between gap-4 shadow-3xl border-r-2">
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

        {/* <div className="line w-full h-0 border border-slate-300"></div> */}

        <h3 className="text-base text-slate-950 font-semibold capitalize">
          timeline:
        </h3>

        <div className="timeline w-full h-2/3 border border-slate-300 rounded-lg flex flex-col-reverse justify-between py-6 px-6">
          {shipmentDetails && (
            <>
              {shipmentDetails.timeline.map((event, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="material-symbols-outlined">
                    {event.event === "Manufactured" ? <>factory</> : ""}
                    {event.event === "Shipped" ? <>package_2</> : ""}
                    {event.event === "delivered" ? <>check_circle</> : ""}
                  </span>
                  <div className="flex flex-col">
                    <p>{event.event}</p>
                    <p>{FormatDate(event.date)}</p>
                  </div>
                </div>
              ))}
              {shipmentDetails.status === "In Transit" ? (
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined">
                    local_shipping
                  </span>
                  <div className="flex flex-col">
                    <p> {shipmentDetails.status} </p>
                    <p> {shipmentDetails.estimatedDelivery} </p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </>
          )}
        </div>

        <div className="others w-full h-1/6 border border-slate-300 rounded-lg flex items-center gap-2 px-4 pt-6">
          {/* temp */}
          <div className="w-1/3 h-full flex flex-col items-center justify-start gap-2">
            <span className="material-symbols-outlined">thermostat</span>
            {shipmentDetails && <p> {shipmentDetails.temperature} </p>}
          </div>
          {/* humidity */}
          <div className="w-1/3 h-full flex flex-col items-center justify-start gap-2">
            <span className="material-symbols-outlined">water_drop</span>
            {shipmentDetails && <p> {shipmentDetails.humidity} </p>}
          </div>
          {/* qa */}
          <div className="w-1/3 h-full flex flex-col items-center justify-start gap-2">
            <span className="material-symbols-outlined">verified_user</span>
            {shipmentDetails && <p> {shipmentDetails.qaOfficer} </p>}
          </div>
        </div>
      </div>

      <div
        id="map"
        className="h-full w-3/5 border-8 border-l-0 border-slate-100 rounded-lg rounded-l-none bg-slate-100 overflow-hidden"
      >
        <MapBoxComponent shipmentDetails={shipmentDetails} />
      </div>
    </section>
  );
}

export default TrackShipment;
