import React from "react";

function BatchInfo() {
  return (
    <div className="h-full p-4 ">
      <h2 className="text-2xl font-bold">Batch Information</h2>
      <div className="p-4 mt-4 bg-white rounded shadow">
        <p>Batch Number: 12345</p>
        <p>Manufacturer: ABC Pharma</p>
        <p>Production Date: 2024-06-01</p>
        <p>Status: In Transit</p>
        <h3 className="mt-4 text-lg font-bold">Transaction History</h3>
        <ul className="mt-2 list-disc list-inside">
          <li>Manufactured on 2024-06-01 by ABC Pharma</li>
          <li>Shipped to XYZ Wholesaler on 2024-06-02</li>
          <li>Received by XYZ Wholesaler on 2024-06-03</li>
        </ul>
      </div>
    </div>
  );
}

export default BatchInfo;
