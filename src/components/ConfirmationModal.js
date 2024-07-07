// src/ConfirmationModal.js

import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Assuming your root element has an id of 'root'

function ConfirmationModal({
  isOpen,
  formData,
  isSubmitted,
  onClose,
  onConfirm,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Confirm Shipment Details"
      overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50"
      className="bg-white p-6 rounded-lg shadow-lg relative"
    >
      {isSubmitted ? (
        <div className="flex flex-col items-center gap-8">
          <span
            className="material-symbols-outlined text-9xl text-green-600"
            style={{ maxWidth: "300px" }}
          >
            task_alt
          </span>
          <p className="text-green-600">Shipment created successfully!</p>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Confirm Shipment Details</h2>
          <ul className="mb-4">
            {Object.keys(formData).map((key) => (
              <li key={key} className="flex justify-between mb-2">
                <span className="font-semibold">
                  {key.replace(/([A-Z])/g, " $1")}
                </span>
                <span>{formData[key]}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-end gap-4">
            <button
              className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-200"
              onClick={onClose}
            >
              Edit
            </button>
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-500"
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}

export default ConfirmationModal;
