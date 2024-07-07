// src/ConfirmationModal.js

import React from "react";
import Modal from "react-modal";
import { ModalRecord } from "./Components";

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
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      className="bg-slate-100 rounded-3xl p-8 w-3/5 h-2/3 shadow-xl relative flex flex-col items-center justify-start gap-6"
    >
      {isSubmitted ? (
        <div className="h-full flex flex-col items-center justify-center gap-8">
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
          <h3 className="text-lg font-medium text-gray-900 w-full text-center select-none capitalize">
            Confirm Shipment Details
          </h3>

          <div className="w-full h-0 border border-gray-300"></div>

          <div className="w-full h-4/5 overflow-item flex flex-col gap-4 pl-4 pr-8">
            {Object.keys(formData).map((key) => (
              <ModalRecord
                key={key}
                title={key.replace(/([A-Z])/g, " $1")}
                value={formData[key]}
                noCopy
              />
            ))}
            </div>

          <div className="w-full flex justify-end gap-4">
            <button
              className="w-32 px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-200"
              onClick={onClose}
            >
              Edit
            </button>
            <button
              className="w-32 px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-500"
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
