import React, { useState } from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import { FaUsers, FaRocketchat } from "react-icons/fa";
import { PiChatCenteredTextDuotone } from "react-icons/pi";
import { FiSettings } from "react-icons/fi";
import { TbLogout2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

function Sidebar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownItems = [
    {
      icon: <FiSettings size={25} color="lightblue" />,
      title: "Settings",
      to: "/settings",
      color: "text-blue-300",
    },
    {
      icon: <TbLogout2 size={25} color="lightred" />,
      title: "Logout",
      to: "#",
      color: "text-red-300",
    },
  ];
  const user = {
    username: "Emirhan Yaman",
    profilePicture: "",
  };
  const users = [
    {
      username: "Abdul Rezzak",
      profilePicture: "",
      status: "Online",
    },
    {
      username: "Enes Batur",
      profilePicture: "",
      status: "Offline",
    },
    {
      username: "sikici31",
      profilePicture: "",
      status: "Online",
    },
    {
      username: "sikici31",
      profilePicture: "",
      status: "Online",
    },
    {
      username: "sikici31",
      profilePicture: "",
      status: "Online",
    },
    {
      username: "sikici31",
      profilePicture: "",
      status: "Online",
    },
  ];
  const rooms = [
    {
      name: "Fun",
      img: "",
      newMessages: 2,
    },
    {
      name: "Meeting Room",
      img: "",
      newMessages: 0,
    },
    {
      name: "News",
      img: "",
      newMessages: 12,
    },
    {
      name: "News",
      img: "",
      newMessages: 12,
    },
    {
      name: "News",
      img: "",
      newMessages: 12,
    },
    {
      name: "News",
      img: "",
      newMessages: 12,
    },
    {
      name: "News",
      img: "",
      newMessages: 12,
    },
    {
      name: "News",
      img: "",
      newMessages: 12,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* user info */}
      <div className="flex items-center gap-1">
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt=""
            className="w-10 h-10 object-cover rounded-full"
          />
        ) : (
          <BiSolidUserCircle size={50} />
        )}
        <div
          onClick={() => setShowDropdown(!showDropdown)}
          className="relative border py-1 px-2 rounded-[4px] flex items-center gap-2 hover:cursor-pointer"
        >
          <p className="text-lg">{user.username} </p>
          {showDropdown ? (
            <BsArrowUpCircle size={25} />
          ) : (
            <BsArrowDownCircle size={25} />
          )}
          <CSSTransition
            in={showDropdown}
            timeout={500}
            classNames="animate-dropdown"
            unmountOnExit
          >
            <div
              className={`absolute top-12 left-0 w-40 p-2 rounded-sm bg-slate-800 space-y-2 animate-dropdown`}
            >
              {dropdownItems?.map((item, i) => (
                <Link
                  key={i}
                  to={item.to}
                  className={`flex items-center gap-2 text-lg hover:bg-slate-700 p-1 rounded-sm ${item.color}`}
                >
                  {item.icon}
                  {item.title}
                </Link>
              ))}
            </div>
          </CSSTransition>
        </div>
      </div>
      {/* users */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <FaUsers size={40} />
          <h3 className="text-2xl">Users (24)</h3>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search for users..."
            className="p-1 rounded-lg w-full pl-2"
          />
        </div>
        <div className="border border-slate-600 p-2 rounded-md space-y-2 bg-black h-[234px] overflow-auto scrollbar-hide">
          {users?.map((user, i) => (
            <div
              key={i}
              className="flex items-center gap-1 p-1 hover:bg-slate-900 cursor-pointer hover:rounded-md"
            >
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt=""
                  className="w-10 h-10 object-cover rounded-full"
                />
              ) : (
                <BiSolidUserCircle size={40} />
              )}
              <p>{user.username}</p>
              <span
                className={`${
                  user.status === "Offline" ? "text-red-500" : "text-green-500"
                }`}
              >
                ({user.status})
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* rooms */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <FaRocketchat size={40} />
          <h3 className="text-2xl">Rooms (7)</h3>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search for rooms..."
            className="p-1 rounded-lg w-full pl-2"
          />
        </div>
        <div className="border border-slate-600 p-2 rounded-md space-y-2 bg-black h-[234px] overflow-auto scrollbar-hide">
          {rooms?.map((room, i) => (
            <div
              key={i}
              className="flex items-center gap-1 p-1 hover:bg-slate-900 cursor-pointer hover:rounded-md"
            >
              {room.img ? (
                <img
                  src={room.img}
                  alt=""
                  className="w-10 h-10 object-cover rounded-full"
                />
              ) : (
                <PiChatCenteredTextDuotone size={40} />
              )}
              <p>{room.name}</p>
              {room.newMessages > 0 && (
                <span className="border rounded-full w-6 h-6 ml-auto flex justify-center items-center bg-blue-500">
                  {room.newMessages}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
