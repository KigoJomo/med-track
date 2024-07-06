// src/components/Dashboard.js
import React from "react";

const StatCard = ({ number, category }) => {
  return (
    <div class="stat flex flex-col gap-1 items-center">
      <h2 class="text-2xl text-gray-800 font-bold">{number}</h2>
      <p class="text-gray-600 text-sm capitalize">{category}</p>
    </div>
  );
};

function Dashboard() {
  return (
    <>
      <section class="shadow-xl w-full h-3/5 flex flex-col items-center justify-start px-8 py-6 bg-white rounded-xl">
        <div class="top w-full flex justify-between">
          <div class="flex flex-col gap-1">
            <h2 class="capitalize text-2xl font-bold text-gray-800">
              recent shipments
            </h2>
            <p class="text-gray-600 text-sm">117 total</p>
          </div>
          <div class="right flex gap-6">
            <StatCard number="43" category="received" />
            <div className="h-full w-0 border"></div>
            <StatCard number="40" category="verified" />
          </div>
        </div>
      </section>

      <section class="w-full h-2/5 flex justify-center gap-6">
        <div class="left w-1/2 h-full bg-white rounded-xl shadow-xl"></div>
        <div class="right w-1/2 h-full bg-slate-900 rounded-xl shadow-xl"></div>
      </section>
    </>
  );
}

export default Dashboard;
