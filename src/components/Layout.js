// src/components/Layout.js
import { Outlet, Link, NavLink } from "react-router-dom";
import { FieldWrapper } from "./Elements";

import logo from "../assets/images/medtrack-logo.png";
import profile_pic from "../assets/images/user.jpeg";

const NavigationLink = ({ to, label, icon }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "flex items-center gap-2 px-4 py-2 border border-transparent rounded-full text-white bg-slate-900 w-fit lg:w-full"
          : "flex items-center gap-2 px-4 py-2 border border-transparent rounded-full text-slate-900 hover:border hover:border-slate-900 w-fit lg:w-full"
      }
    >
      <span className="material-symbols-outlined max-w-8 text-lg">{icon}</span>
      <p className="capitalize hidden lg:block text-sm">{label}</p>
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
  const currentDate = getFormattedDate();

  return (
    <>
      <nav className="w-fit lg:w-1/4 min-h-full border-8 border-slate-200 py-8 px-8 rounded-2xl relative flex flex-col items-center gap-6 bg-slate-100 shadow-xl">
        <Link
          to="/"
          className="logo w-fit lg:w-full flex items-center gap-2 px-5"
        >
          <img src={logo} alt="MedTrack Logo" className="h-8 aspect-1" />
          <h2 className="text-xl text-gray-800 uppercase font-bold hidden lg:block">
            <span className="text-indigo-600">M</span>ed
            <span className="text-indigo-600">T</span>rack
          </h2>
        </Link>

        <div className="line w-full h-0  border border-slate-300"></div>

        <div class="navigation flex flex-col w-full h-fit gap-4">
          <NavigationLink to="/" icon="home" label="dashboard" />
          <NavigationLink to="/batch-info" icon="info" label="batch info" />
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
          <img src={profile_pic} alt="user profile" className="h-14 aspect-1 rounded-full border-2 border-indigo-600" />

          <h3 className="name text-gray-800 capitalize text-base font-bold">john doe</h3>
          <p className="email text-gray-600 text-sm">johndoe@gmail.com</p>

        </div>

      </nav>

      <main class="w-3/4 min-h-full rounded-xl flex flex-col gap-6">
        <header className="w-full h-20 bg-white rounded-xl shadow-xl flex items-center justify-between px-8">
          <FieldWrapper
            id="search"
            type="text"
            placeholder="Search"
            icon="search"
            iconPosition="right"
          />

          <p className="text-sm text-gray-600">{ currentDate }</p>

        </header>

        <div class="container w-full h-full rounded-xl flex flex-col gap-6">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
