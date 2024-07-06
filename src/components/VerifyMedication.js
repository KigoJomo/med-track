import React from "react";

function VerifyMedication() {
  return (
    <div className="flex items-center justify-center h-full ">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center">Verify Medication</h2>
        <form className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="token"
              className="block text-sm font-medium text-gray-700"
            >
              Batch Token
            </label>
            <input
              type="text"
              id="token"
              name="token"
              required
              className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 font-medium text-white bg-indigo-600 rounded hover:bg-indigo-500"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyMedication;
