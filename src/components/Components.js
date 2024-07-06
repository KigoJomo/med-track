// src/components/Card.js
import React from "react";
import ReactModal from "react-modal";

const TableHeaderCol = ({ text }) => {
  return (
    <th className="w-1/6 text-left text-xs text-gray-400 font-semibold py-3">
      {text}
    </th>
  );
};

const TableDataCol = ({ text, id, shipDate }) => {
  return (
    <td
      className={`w-1/6 text-left text-sm font-normal text-ellipsis text-nowrap overflow-hidden py-3 px-2 ${
        id ? "text-gray-800 font-semibold" : "text-gray-600"
      } ${
        shipDate
          ? "relative flex items-center px-3 after:absolute after:h-3/4 after:w-1/2 after:bg-slate-300 after:-z-10 after:left-0 after:rounded-full after:border after:border-indigo-600 "
          : ""
      }`} style={{ zIndex:0 }}
    >
      {shipDate ? <p className="text-xs truncate-three">{text}</p> : <>{text}</>}
    </td>
  );
};

const FieldWrapper = ({
  label,
  id,
  type,
  placeholder,
  icon,
  iconPosition = "left",
}) => {
  const isIconLeft = iconPosition === "left";

  return (
    <div className="fieldwrapper flex flex-col gap-1 items-start bg-transparent min-w-96">
      {label && (
        <label htmlFor={id} className="text-sm capitalize text-gray-600">
          {label}
        </label>
      )}
      <div className="input relative flex items-center w-full">
        {isIconLeft && (
          <span className="material-symbols-outlined absolute left-4 text-xl text-gray-600">
            {icon}
          </span>
        )}
        <input
          type={type}
          name={id}
          id={id}
          placeholder={placeholder}
          className={`text-gray-800 text-sm rounded-full px-12 py-2 flex items-center bg-slate-200 w-full outline-none border-4 border-transparent focus:outline-none focus:border-slate-400 transition-all ${
            isIconLeft ? "pl-12" : "pr-12"
          }`}
        />
        {!isIconLeft && (
          <span className="material-symbols-outlined absolute right-4 text-xl text-gray-600">
            {icon}
          </span>
        )}
      </div>
    </div>
  );
};

const RecentShipments = ({ shipments, onShipmentClick }) => {
  return (
    <table className="w-full max-w-full h-3/4 overflow-hidden flex flex-col">
      <thead className="w-full max-w-full border border-gray-300 border-r-0 border-l-0">
        <tr className="w-full max-w-full flex px-1">
          <TableHeaderCol text="Shipment ID" />
          <TableHeaderCol text="Batch Number" />
          <TableHeaderCol text="Date Shipped" />
          <TableHeaderCol text="Status" />
          <TableHeaderCol text="Estimated Delivery" />
          <TableHeaderCol text="Current Location" />
        </tr>
      </thead>
      <tbody className="w-full flex pt-2 flex-col overflow-y-scroll relative">
        {shipments.map((shipment) => (
          <tr
            key={shipment.id}
            onClick={() => onShipmentClick(shipment)}
            className="cursor-pointer hover:bg-slate-200 rounded-xl overflow-hidden flex items-center px-1 flex-shrink-0"
          >
            <TableDataCol text={shipment.id} id={true} />
            <TableDataCol text={shipment.batchNumber} />
            <TableDataCol text={shipment.dateShipped} shipDate={true} />
            <TableDataCol text={shipment.status} />
            <TableDataCol text={shipment.estimatedDelivery} />
            <TableDataCol text={shipment.currentLocation} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const ShipmentDetails = ({ isOpen, onClose, shipment }) => {
  return (
    <ReactModal isOpen={isOpen} onRequestClose={onClose}>
      <div className="p-4">
        <h2 className="text-2xl font-bold">Shipment Details</h2>
        <div className="mt-4 bg-white rounded shadow p-4">
          <p>
            <strong>Shipment ID:</strong> {shipment.id}
          </p>
          <p>
            <strong>Batch Number:</strong> {shipment.batchNumber}
          </p>
          <p>
            <strong>Manufacturer:</strong> {shipment.manufacturer}
          </p>
          <p>
            <strong>Production Date:</strong> {shipment.productionDate}
          </p>
          <p>
            <strong>Quality Assurance Officer:</strong> {shipment.qaOfficer}
          </p>
          <p>
            <strong>Destination:</strong> {shipment.destination}
          </p>
          <p>
            <strong>Status:</strong> {shipment.status}
          </p>
          <p>
            <strong>Date Shipped:</strong> {shipment.dateShipped}
          </p>
          <p>
            <strong>Estimated Delivery Date:</strong>{" "}
            {shipment.estimatedDelivery}
          </p>
          <p>
            <strong>Current Location:</strong> {shipment.currentLocation}
          </p>
          <p>
            <strong>Temperature:</strong> {shipment.temperature}
          </p>
          <p>
            <strong>Humidity:</strong> {shipment.humidity}
          </p>
          <h3 className="mt-4 text-lg font-bold">Transaction History</h3>
          <ul className="mt-2 list-disc list-inside">
            {shipment.transactionHistory.map((event, index) => (
              <li key={index}>
                <p>
                  <strong>Date/Time:</strong> {event.dateTime}
                </p>
                <p>
                  <strong>Event:</strong> {event.event}
                </p>
                <p>
                  <strong>Location:</strong> {event.location}
                </p>
                <p>
                  <strong>Actor:</strong> {event.actor}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ReactModal>
  );
};

export { FieldWrapper, RecentShipments, ShipmentDetails };
