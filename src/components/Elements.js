// src/components/Card.js
import React from "react";

const FieldWrapper = ({ label, id, type, placeholder, icon, iconPosition = "left" }) => {
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

export { FieldWrapper };
