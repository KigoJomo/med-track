// src/CreateShipment.js
import React, { useState } from "react";
import { FieldWrapper } from "./Components";
import ConfirmationModal from "./ConfirmationModal";

function CreateShipment() {
  const [formData, setFormData] = useState({
    batchNumber: "",
    manufacturer: "",
    productionDate: "",
    qaOfficer: "",
    destination: "",
    dateShipped: "",
    estimatedDelivery: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsModalOpen(false);
      setFormData({
        batchNumber: "",
        manufacturer: "",
        productionDate: "",
        qaOfficer: "",
        destination: "",
        dateShipped: "",
        estimatedDelivery: "",
      });
    }, 4000); // Show success message for 4 seconds
  };

  return (
    <section className="shadow-xl w-full h-full flex flex-col items-start justify-start gap-8 px-8 py-6 bg-white rounded-xl">
      <h2 className="capitalize text-2xl font-bold text-gray-800">
        Create Shipment
      </h2>
      <form
        onSubmit={handleSubmit}
        className="w-full h-4/5 overflow-item flex flex-col gap-8 pl-6 pr-32"
      >
        <FieldWrapper
          label="Batch Number"
          id="batchNumber"
          type="text"
          placeholder="Enter batch number"
          icon="receipt"
          iconPosition="left"
          value={formData.batchNumber}
          onChange={handleChange}
        />
        <FieldWrapper
          label="Manufacturer"
          id="manufacturer"
          type="text"
          placeholder="Enter manufacturer"
          icon="factory"
          iconPosition="left"
          value={formData.manufacturer}
          onChange={handleChange}
        />
        <FieldWrapper
          label="Production Date"
          id="productionDate"
          type="date"
          placeholder="Enter production date"
          icon="event"
          iconPosition="left"
          value={formData.productionDate}
          onChange={handleChange}
        />
        <FieldWrapper
          label="Quality Assurance Officer"
          id="qaOfficer"
          type="text"
          placeholder="Enter QA officer"
          icon="verified_user"
          iconPosition="left"
          value={formData.qaOfficer}
          onChange={handleChange}
        />
        <FieldWrapper
          label="Destination"
          id="destination"
          type="text"
          placeholder="Enter destination"
          icon="location_on"
          iconPosition="left"
          value={formData.destination}
          onChange={handleChange}
        />
        <FieldWrapper
          label="Date Shipped"
          id="dateShipped"
          type="date"
          placeholder="Enter shipping date"
          icon="local_shipping"
          iconPosition="left"
          value={formData.dateShipped}
          onChange={handleChange}
        />
        <FieldWrapper
          label="Estimated Delivery Date"
          id="estimatedDelivery"
          type="date"
          placeholder="Enter estimated delivery date"
          icon="schedule"
          iconPosition="left"
          value={formData.estimatedDelivery}
          onChange={handleChange}
        />
        <div className="line w-full h-0 border border-slate-300"></div>
        <button
          type="submit"
          className="w-full py-2 font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-500"
        >
          {isSubmitted ? "Shipment Created!" : "Create Shipment"}
        </button>
      </form>
      <ConfirmationModal
        isOpen={isModalOpen}
        formData={formData}
        isSubmitted={isSubmitted}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </section>
  );
}

export default CreateShipment;
