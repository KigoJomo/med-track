import React, { useState } from "react";
import { FormatDate } from "./Components";

const MedData = ({ title, value }) => {
  return (
    <div className="med-data flex items-center gap-2  text-xs text-gray-600">
      <p className="title font-bold w-24">{title}</p>
      <div className="bar h-2 w-0 border border-slate-500"></div>
      <p className="value font-normal">{value}</p>
    </div>
  );
};

const SupplyChainEvent = ({ event, actor, date, location }) => {
  return (
    <div className="w-full py-6 px-6 flex flex-col gap-2 bg-slate-300 rounded-3xl">
      <div className="event flex gap-2 items-center">
        <span className="h-1 aspect-1 rounded-full bg-gray-500"></span>
        <span className="h-2/3 w-0 border border-gray-500"></span>
        <h2 className="capitalize text-xl font-semibold">{event}</h2>
      </div>

      <div className="ml-8 actor-date flex items-center gap-4">
        <div className="actor flex items-center gap-2 text-gray-600">
          <span className="material-symbols-outlined text-xl">
            account_circle
          </span>
          <p className="text-sm capitalize">{actor}</p>
        </div>
        <div className="date flex items-center gap-2 text-gray-600">
          <span className="material-symbols-outlined text-xl">event</span>
          <p className="text-sm capitalize">{date}</p>
        </div>
      </div>

      <div className="ml-8 location w-4/5 p-4 flex items-center gap-2 bg-slate-400 rounded-3xl text-gray-950">
        <span className="material-symbols-outlined text-xl">pin_drop</span>
        <p className="text-base capitalize">{location}</p>
      </div>
    </div>
  );
};

function VerifyMedication() {
  const [medicationDetails, setMedicationDetails] = useState(null);
  const [searchId, setSearchId] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    // Fetch medication details using the searchId
    fetch(`./medications.json`)
      .then((response) => response.json())
      .then((data) => {
        setMedicationDetails(
          data.find((medication) => medication.id === searchId)
        );
        console.table(medicationDetails);
      })
      .catch((error) =>
        console.error("Error fetching medication details:", error)
      );
  };

  return (
    <section className="shadow-xl w-full h-full flex flex-col items-center gap-4 bg-slate-100 px-8 py-6 rounded-xl overflow-hidden">
      <form
        className="w-full flex items-center gap-2 relative"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          name="search"
          id="search"
          required
          placeholder="Enter Medication ID"
          className="text-gray-800 text-sm rounded-full pl-12 py-2 bg-slate-200 w-full outline-none border-2 border-transparent focus:bg-white focus:outline-none focus:border-indigo-600 transition-all"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
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

      <div className="details w-full h-full px-8 flex flex-col gap-2 overflow-item">
        {medicationDetails ? (
          <>
            <div className="heading w-full flex items-center justify-between border-b border-slate-300 py-4">
              <div className="left flex flex-col gap-1">
                <div className="title flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-4xl w-fit text-gray-600"
                    style={{ maxWidth: 64 }}
                  >
                    medication
                  </span>
                  <h1 className="capitalize text-2xl text-slate-800 font-bold">
                    {medicationDetails.name}
                  </h1>
                </div>
                {medicationDetails.isAuthentic === true && (
                  <div className="ml-12 flex items-center justify-center gap-1 capitalize border rounded-lg border-green-300 text-green-800 bg-green-200 w-fit px-1 py-1">
                    <span className="material-symbols-outlined text-lg h-5 align-middle flex items-center">
                      verified
                    </span>
                    <p className="text-xs">authentic</p>
                  </div>
                )}
                {medicationDetails.isAuthentic === false && (
                  <div className="ml-12 flex items-center justify-center gap-1 capitalize border rounded-lg border-red-300 text-red-800 bg-red-200 w-fit px-1 py-1">
                    <span className="material-symbols-outlined text-lg h-5 align-middle flex items-center">
                      report
                    </span>
                    <p className="text-xs">counterfeit</p>
                  </div>
                )}
                <div className="manufacturer text-xs text-gray-600 font-bold ml-12">
                  {medicationDetails.manufacturer}
                </div>
              </div>

              <div className="right flex flex-col items-start gap-2">
                <MedData
                  title="Batch Number"
                  value={medicationDetails.batchNumber}
                />
                <MedData
                  title="Prod. Date"
                  value={FormatDate(medicationDetails.productionDate)}
                />
                <MedData
                  title="Exp. Date"
                  value={FormatDate(medicationDetails.expiryDate)}
                />
              </div>
            </div>

            {/* body with supply-chain details */}

            <h3 className=" mt-4 text-gray-900 font-medium capitalize">supply chain events</h3>
            <div className="w-full flex flex-col gap-4 px-6 pb-24">
              {medicationDetails.supplyChain.map((event, index) => (
                <SupplyChainEvent key={index} event={event.event} actor={event.holder} date={FormatDate(event.date)} location={event.location} />
              ))}
            </div>
          </>
        ) : (
          <div className="w-full justify-center flex items-center gap-2 text-gray-600 mt-12">
            <span className="material-symbols-outlined">info</span>
            <p className="capitalize">
              search medication by id to see more details
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default VerifyMedication;
