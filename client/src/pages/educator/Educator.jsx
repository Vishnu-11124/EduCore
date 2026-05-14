import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/educator/Sidebar";

const Educator = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      {/* <Navbar /> */}

      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white min-h-[calc(100vh-3rem)] rounded-2xl shadow-sm p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Educator;