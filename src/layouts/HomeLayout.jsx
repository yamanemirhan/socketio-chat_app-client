import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";

function HomeLayout() {
  const isLoggedIn = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth");
    }
  }, [navigate]);

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
