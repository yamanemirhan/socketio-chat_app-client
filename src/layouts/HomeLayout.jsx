import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function HomeLayout() {
  return (
    <div className="flex justify-center items-center gap-10 bg-slate-800 rounded-lg p-4">
      <div className="bg-slate-900 p-4 rounded-lg h-[790px]">
        <Sidebar />
      </div>
      <div className="bg-slate-900 p-4 rounded-lg h-[790px] w-[600px]">
        <Outlet />
      </div>
    </div>
  );
}

export default HomeLayout;
