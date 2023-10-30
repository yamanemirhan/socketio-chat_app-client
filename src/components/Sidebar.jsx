import React, { useContext, useEffect, useState } from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import { FaUsers, FaRocketchat } from "react-icons/fa";
import { PiChatCenteredTextDuotone } from "react-icons/pi";
import { FiSettings } from "react-icons/fi";
import { TbLogout2 } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useLogoutUserMutation } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import { addNotifications, resetNotifications } from "../features/userSlice";

function Sidebar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);

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

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutUser] = useLogoutUserMutation();

  const handleMembersSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filteredMembersList = members.filter((member) =>
      member.username.toLowerCase().includes(searchQuery)
    );
    setFilteredMembers(filteredMembersList);
  };

  const handleRoomsSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filteredRoomsList = rooms.filter((room) =>
      room.toLowerCase().includes(searchQuery)
    );
    setFilteredRooms(filteredRoomsList);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    // logout the user
    await logoutUser(user);
    navigate("/auth");
  };

  const {
    socket,
    setMembers,
    members,
    setCurrentRoom,
    setRooms,
    privateMemberMsg,
    rooms,
    setPrivateMemberMsg,
    currentRoom,
  } = useContext(AppContext);

  function joinRoom(room, isPublic = true) {
    socket.emit("join-room", room, currentRoom);
    setCurrentRoom(room);

    if (isPublic) {
      setPrivateMemberMsg(null);
    }
    // dispatch for notifications
    dispatch(resetNotifications(room));
  }

  socket.off("notifications").on("notifications", (room) => {
    if (currentRoom != room) {
      dispatch(addNotifications(room));
    }
  });

  useEffect(() => {
    if (user) {
      setCurrentRoom("Technology");
      getRooms();
      socket.emit("join-room", "Technology");
      socket.emit("new-user");
    }
  }, []);

  socket.off("new-user").on("new-user", (payload) => {
    setMembers(payload);
  });

  function getRooms() {
    fetch("http://localhost:4000/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }

  function orderIds(id1, id2) {
    if (id1 > id2) {
      return id1 + "-" + id2;
    } else {
      return id2 + "-" + id1;
    }
  }

  function handlePrivateMemberMsg(member) {
    setPrivateMemberMsg(member);
    const roomId = orderIds(user?.data?._id, member._id);
    joinRoom(roomId, false);
  }

  return (
    <div className="flex flex-col gap-8">
      {/* user info */}
      <div className="flex items-center gap-1">
        {user?.data?.profilePicture ? (
          <img
            src={user?.data?.profilePicture}
            alt={user?.data?.username}
            className="w-10 h-10 object-cover rounded-full"
          />
        ) : (
          <BiSolidUserCircle size={50} />
        )}
        <div
          onClick={() => setShowDropdown(!showDropdown)}
          className="relative border py-1 px-2 rounded-[4px] flex items-center gap-2 hover:cursor-pointer"
        >
          <p className="text-lg">{user?.data?.username}</p>
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
                  onClick={(e) => item.title === "Logout" && handleLogout(e)}
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
          <h3 className="text-2xl">{`Users (${members.length})`}</h3>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search for users..."
            className="p-1 rounded-lg w-full pl-2"
            onChange={handleMembersSearch}
          />
        </div>
        <div className="border border-slate-600 p-2 rounded-md space-y-2 bg-black h-[234px] overflow-auto scrollbar-hide">
          {(filteredMembers.length > 0 ? filteredMembers : members)?.map(
            (member) => (
              <div
                key={member._id}
                onClick={() => {
                  if (member._id !== user?.data?._id) {
                    handlePrivateMemberMsg(member);
                  }
                }}
                className={`w-[220px] flex items-center gap-1 p-1 hover:bg-slate-900 cursor-pointer hover:rounded-md ${
                  privateMemberMsg?._id === member?._id && "bg-purple-900"
                }`}
              >
                {member.profilePicture ? (
                  <img
                    src={member.profilePicture}
                    alt={member.username}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                ) : (
                  <BiSolidUserCircle size={40} />
                )}
                <p>{member.username}</p>
                <span
                  className={`${
                    member.status === "offline"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  (
                  {`${
                    member.username === user?.data?.username
                      ? "ME"
                      : member.status
                  }`}
                  )
                </span>
                {user?.data?.newMessages[
                  orderIds(member._id, user?.data?._id)
                ] !== undefined && (
                  <span className="w-6 h-6 ml-auto border rounded-full flex items-center justify-center bg-blue-700 text-blue-100">
                    {
                      user?.data?.newMessages[
                        orderIds(member._id, user?.data?._id)
                      ]
                    }
                  </span>
                )}
              </div>
            )
          )}
        </div>
      </div>
      {/* rooms */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <FaRocketchat size={40} />
          <h3 className="text-2xl">Rooms ({rooms.length})</h3>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search for rooms..."
            className="p-1 rounded-lg w-full pl-2"
            onChange={handleRoomsSearch}
          />
        </div>
        <div className="border border-slate-600 p-2 rounded-md space-y-2 bg-black h-[234px] overflow-auto scrollbar-hide">
          {(filteredRooms.length > 0 ? filteredRooms : rooms)?.map(
            (room, i) => (
              <div
                key={i}
                onClick={() => joinRoom(room)}
                className={`flex items-center gap-1 p-1 hover:bg-slate-900 cursor-pointer hover:rounded-md ${
                  room === currentRoom && "bg-blue-800"
                }`}
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
                <p>{room}</p>
                {currentRoom !== room &&
                  user?.data?.newMessages[room] !== undefined && (
                    <span className="w-6 h-6 ml-auto border rounded-full flex items-center justify-center bg-blue-700 text-blue-100">
                      {user?.data?.newMessages[room]}
                    </span>
                  )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
