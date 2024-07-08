import React from "react";

function TrackShipment() {
  return (
    <section className="shadow-xl w-full h-full flex items-center gap-8  rounded-xl overflow-hidden">
      <div className="h-full w-2/5 bg-white px-8 py-6 flex flex-col items-start gap-4">

        <form className="w-full flex items-center gap-2 relative">
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

        <h3 id="enteredId" className="text-base font-semibold text-gray-900 select-none capitalize">
          SHIP1234
        </h3>

        {/* timeline */}

        {/* other details */}
      </div>

      <div id="map" className="h-full w-3/5"></div>
    </section>
  );
}

export default TrackShipment;
