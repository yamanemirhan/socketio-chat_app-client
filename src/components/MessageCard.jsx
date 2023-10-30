import React from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import { useSelector } from "react-redux";

function MessageCard({ content, time, sender }) {
  const user = useSelector((state) => state.user);

  return (
    <div className="relative w-56 max-h-40 bg-slate-600 bg-opacity-30 border rounded-lg p-2">
      {/* user info */}
      <div className="flex items-center gap-1">
        {user?.data?.profilePicture ? (
          <img
            src={user?.data?.profilePicture}
            alt={user?.data?.username}
            className="w-8 h-8 object-cover rounded-full"
          />
        ) : (
          <BiSolidUserCircle size={40} />
        )}
        <p>{sender?.data?.username}</p>
      </div>
      {/* message text */}
      <p className="overflow-auto scrollbar-hide max-h-20 mb-5">{content}</p>
      {/* message date */}
      <span className="absolute right-0 bottom-0 p-1">{time}</span>
    </div>
  );
}

export default MessageCard;
