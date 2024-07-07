// src/components/Layout.js
import { useState } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import HelpModal from "./HelpModal";

import logo from "../assets/images/medtrack-logo.png";
import profile_pic from "../assets/images/user.jpeg";

const NavigationLink = ({ to, label, icon }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "flex items-center gap-2 px-4 py-2 border border-transparent rounded-full text-white bg-indigo-600 w-fit lg:w-full"
          : "flex items-center gap-2 px-4 py-2 border border-transparent rounded-full text-slate-900 hover:border hover:border-indigo-600 w-fit lg:w-full"
      }
    >
      <span className="material-symbols-outlined max-w-8 text-lg overflow-hidden flex-grow-0 flex-shrink-0">{icon}</span>
      <p className="capitalize font-medium hidden lg:block text-sm">{label}</p>
    </NavLink>
  );
};

const getFormattedDate = () => {
  const options = {
    weekday: "long",
    // year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date().toLocaleDateString(undefined, options);
};

const Layout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentDate = getFormattedDate();

  return (
    <>
      <nav className="w-fit lg:w-1/4 min-h-full border-8 border-slate-200 py-8 px-8 rounded-2xl relative flex flex-col items-center gap-6 bg-slate-100 shadow-xl">
        <Link
          to="/"
          className="logo w-fit lg:w-full flex items-center gap-2 px-5"
        >
          <img src={logo} alt="MedTrack Logo" className="h-8 aspect-1" />
          <h2 className="text-xl text-gray-950 uppercase font-bold hidden lg:block">
            <span className="text-indigo-600">M</span>ed
            <span className="text-indigo-600">T</span>rack
          </h2>
        </Link>

        <div className="line w-full h-0  border border-slate-300"></div>

        {/* navigation menu */}
        <div className="navigation flex flex-col w-full h-fit gap-4">
          <NavigationLink to="/" icon="home" label="dashboard" />
          <NavigationLink
            to="/create-shipment"
            icon="add_circle"
            label="create shipment"
          />
          <NavigationLink
            to="/track-shipment"
            icon="local_shipping"
            label="track shipment"
          />
          <NavigationLink
            to="verify-medication"
            icon="verified"
            label="verify medication"
          />
        </div>

        <div className="line w-full h-0  border border-slate-300"></div>

        <div className="w-full h-full flex flex-col items-center justify-end gap-1">
          <div className="w-full px-4 flex items-center gap-2  cursor-pointer hover:font-medium" onClick={()=>setIsModalOpen(true)}>
            <span className="material-symbols-outlined text-gray-600">
              help
            </span>
            <p className="email text-gray-600 text-sm capitalize hover:text-indigo-600">
              help and support
            </p>
          </div>
        </div>
      </nav>

      <main className="w-3/4 min-h-full rounded-xl flex flex-col gap-6">
        <header
          className="w-full bg-white rounded-xl shadow-xl flex items-center justify-between px-8"
          style={{ height: "15%" }}
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-600">
              calendar_month
            </span>
            <p className="text-sm text-gray-600">{currentDate}</p>
          </div>

          <div className="flex items-center gap-4">
            <span
              className="material-symbols-outlined text-gray-600 cursor-pointer select-none hover:rotate-12 transition-all"
              title="No notifications at the moment"
            >
              notifications
            </span>
            <div className="h-10 w-0 border"></div>
            <div className="flex flex-col items-end justify-center">
              <h3 className="text-base text-gray-950 font-medium capitalize">
                john doe
              </h3>
              <p className="text-xs text-gray-600 capitalize">
                inventory manager
              </p>
            </div>
            <img
              className="h-12 aspect-1 rounded-full"
              src={profile_pic}
              alt="user john doe"
            />
          </div>
        </header>

        <div
          className="container w-full rounded-xl flex flex-col gap-6 flex-shrink-0"
          style={{ height: "85%" }}
        >
          <Outlet />
        </div>
      </main>

      <HelpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Layout;
