// src/components/Dashboard.js
import React, {useState, useEffect} from "react";
import { RecentShipments, ShipmentDetails } from "./Components";
import { format } from "date-fns";

const StatCard = ({ number, category }) => {
  return (
    <div className="stat flex flex-col gap-1 items-center">
      <h2 className="text-2xl text-gray-800 font-bold">{number}</h2>
      <p className="text-gray-600 text-sm capitalize">{category}</p>
    </div>
  );
};

function Dashboard() {
  const [shipments, setShipments] = useState([]);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("./shipments.json")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((shipment) => ({
          ...shipment,
          productionDate: format(new Date(shipment.productionDate), "dd MMMM"),
          dateShipped: format(new Date(shipment.dateShipped), "dd MMMM"),
          estimatedDelivery: format(
            new Date(shipment.estimatedDelivery),
            "dd MMMM"
          ),
          transactionHistory: shipment.transactionHistory.map((event) => ({
            ...event,
            dateTime: format(
              new Date(event.dateTime),
              "MMMM dd yyyy, h:mm a (O)"
            ),
          })),
        }));
        setShipments(formattedData);
      })
      .catch((error) => console.error(`Error fetching shipments data:`, error));
  }, []);

  const handleShipmentClick = (shipment) => {
    setSelectedShipment(shipment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedShipment(null);
  };

  return (
    <>
      <section className="shadow-xl w-full h-full flex flex-col items-center justify-start gap-8 px-8 py-6 bg-white rounded-xl">

        <div className="top w-full flex justify-between">

          <div className="flex flex-col gap-1">
            <h2 className="capitalize text-2xl font-bold text-gray-800">
              recent shipments
            </h2>
            <p className="text-gray-600 text-sm">43 total</p>
          </div>

          <div className="right flex gap-6">
            <StatCard number="43" category="received" />
            <div className="h-full w-0 border"></div>
            <StatCard number="40" category="verified" />
          </div>

        </div>

        <RecentShipments shipments={shipments} onShipmentClick={handleShipmentClick} />

        {selectedShipment && (<ShipmentDetails isOpen={isModalOpen} onClose={handleCloseModal} shipment={selectedShipment} />)}

      </section>

      <section className="w-full h-2/5 hidden justify-center gap-6">
        <div className="left w-1/2 h-full bg-white rounded-xl shadow-xl"></div>
        <div className="right w-1/2 h-full bg-slate-900 rounded-xl shadow-xl"></div>
      </section>
    </>
  );
}

export default Dashboard;
