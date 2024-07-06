// src/components/Card.js
import React, {useState} from "react";
import ReactModal from "react-modal";

const TableHeaderCol = ({ text, width }) => {
  return (
    <th className="w-1/6 text-left text-xs text-gray-400 font-semibold py-3 select-none capitalize" style={{ width: width }}>
      {text}
    </th>
  );
};

const TableDataCol = ({ text, id, shipDate, width, wrap }) => {
  return (
    <td
      className={`w-1/6 text-left text-xs font-normal text-ellipsis ${wrap? "text-wrap" : "text-nowrap"} overflow-hidden py-3 px-2 ${
        id ? "text-gray-800 font-semibold" : "text-gray-600"
      } ${
        shipDate
          ? "relative flex items-center px-3 after:absolute after:h-3/4 after:w-1/2 after:bg-slate-300 after:-z-10 after:left-0 after:rounded-full after:border after:border-indigo-600 "
          : ""
      }`}
      style={{ zIndex: 0, width: width }}
    >
      {shipDate ? (
        <p className="text-xs truncate-three">{text}</p>
      ) : (
        <>{text}</>
      )}
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
    <table className="w-full max-w-full h-full overflow-hidden flex flex-col gap-2">

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

      <tbody className="w-full pt-2 flex flex-col gap-2 relative overflow-item">
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

const ModalSection = ({ heading, children }) => {
  return (
    <div className="w-full flex flex-col gap-4 px-4">
      <h4 className="text-base text-gray-950 font-bold capitalize">
        {heading}
      </h4>

      <div className="w-full flex flex-col px-2">{children}</div>
    </div>
  );
};

const ModalRecord = ({ title, value }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };

  return (
    <div className="w-full px-4 py-4 border border-r-0 border-l-0 flex items-center gap-8 relative">
      <p className="text-sm text-gray-500 w-1/3 capitalize font-medium">
        {title}
      </p>
      <p className="text-sm text-gray-900 font-semibold">{value}</p>
      <span className="material-symbols-outlined absolute right-4 text-xl text-indigo-600 cursor-pointer hover:text-lg transition-all" title={`Copy ${title}`} onClick={handleCopy}>
        {isCopied? 'check_circle':'content_copy'}
      </span>

      {/* enable copy functionality */}
      {/* once the value is copied, the span changes to check_circle for a brief moment */}

      {/* <span className="material-symbols-outlined absolute right-4">check_circle</span> */}
    </div>
  );
};

const ShipmentDetails = ({ isOpen, onClose, shipment }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="h-full bg-gray-900 bg-opacity-50 flex items-center justify-center pointer-events-none"
    >
      <div className="p-8 pointer-events-auto w-3/5 h-2/3 bg-slate-100 box-border overflow-hidden rounded-3xl flex flex-col gap-4">
        <h3 className="text-lg font-medium text-gray-900 w-full text-center select-none">
          Shipment Details
        </h3>

        <div className="w-full h-0 border border-gray-300"></div>

        <div className="p-4 h-4/5 overflow-item flex flex-col gap-8">
          <ModalSection heading="general information">
            <ModalRecord title="Shipment ID" value={shipment.id} />
            <ModalRecord title="Batch Number" value={shipment.batchNumber} />
            <ModalRecord title="Manufacturer" value={shipment.manufacturer} />
            <ModalRecord
              title="Production Date"
              value={shipment.productionDate}
            />
            <ModalRecord
              title="Quality Assurance Officer"
              value={shipment.qaOfficer}
            />
            <ModalRecord title="Destination" value={shipment.destination} />
            <ModalRecord title="Status" value={shipment.status} />
            <ModalRecord title="Date Shipped" value={shipment.dateShipped} />
            <ModalRecord
              title="Estimated Delivery Date"
              value={shipment.estimatedDelivery}
            />
            <ModalRecord
              title="Current Location"
              value={shipment.currentLocation}
            />
            <ModalRecord title="Temperature" value={shipment.temperature} />
            <ModalRecord title="Humidity" value={shipment.humidity} />
          </ModalSection>

          <ModalSection heading="transaction history">
            <table className="w-full max-w-full flex flex-col">
              <thead className="w-full border border-gray-300 border-r-0 border-l-0">
                <tr className="w-full max-w-full flex px-1 gap-4">
                  <TableHeaderCol width="25%" text="event" />
                  <TableHeaderCol width="25%" text="actor" />
                  <TableHeaderCol width="25%" text="location" />
                  <TableHeaderCol width="25%" text="date-time" />
                </tr>
              </thead>
              <tbody className="w-full flex pt-2 flex-col overflow-hidden relative">
                {shipment.transactionHistory.map((event, index) => (
                  <tr
                    key={index}
                    className="hover:bg-slate-200 rounded-xl overflow-hidden flex items-center px-1 flex-shrink-0"
                  >
                    <TableDataCol width="25%" wrap text={event.event} id />
                    <TableDataCol width="25%" wrap text={event.actor} />
                    <TableDataCol width="25%" wrap text={event.location} />
                    <TableDataCol width="25%" wrap text={event.dateTime} />
                  </tr>
                ))}
              </tbody>
            </table>
          </ModalSection>
        </div>
      </div>
    </ReactModal>
  );
};

export { FieldWrapper, RecentShipments, ShipmentDetails };
