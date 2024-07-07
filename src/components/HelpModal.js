// src/components/HelpModal.js
import React, { useState } from "react";
import Modal from "react-modal";
import { FieldWrapper } from "./Components";

Modal.setAppElement("#root"); // Assuming your root element has an id of 'root'

const HelpModal = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 4000); // Show success message for 4 seconds
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Help and Support"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      className="bg-slate-100 rounded-3xl p-8 w-3/5 h-2/3 shadow-xl relative flex flex-col items-center justify-center gap-6"
    >
      {isSubmitted ? (
        <div className="flex flex-col items-center gap-8">
          <span className="material-symbols-outlined text-9xl text-green-600" style={{maxWidth: '300px'}}>
            task_alt
          </span>
          <p className="text-green-600">Message sent successfully!</p>
        </div>
      ) : (
        <>
          <h3 className="text-lg font-medium text-gray-900 w-full text-center select-none capitalize">
            help and support
          </h3>
          <div className="w-full h-0 border border-gray-300"></div>
          <form onSubmit={handleSubmit} className="w-3/4 flex flex-col gap-6">
            <FieldWrapper
              label="Name"
              id="name"
              type="text"
              placeholder="Your name"
              icon="person"
            />
            <FieldWrapper
              label="Email"
              id="email"
              type="email"
              placeholder="Your email"
              icon="email"
            />
            <FieldWrapper
              label="Message"
              id="message"
              type="text"
              placeholder="Your message"
              icon="message"
            />
            <button
              type="submit"
              className="mt-4 w-full bg-indigo-600 hover:bg-indigo-500 transition-all text-white py-2 rounded-full"
            >
              Send
            </button>
          </form>
        </>
      )}
    </Modal>
  );
};

export default HelpModal;
