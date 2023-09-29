import React from "react";
import { BiSolidUserCircle } from "react-icons/bi";

function MessageCard() {
  const user = {
    username: "Emirhan Yaman",
    profilePicture: "",
  };

  return (
    <div className="relative w-56 max-h-40 bg-slate-600 bg-opacity-30 border rounded-lg p-2">
      {/* user info */}
      <div className="flex items-center gap-1">
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt=""
            className="w-8 h-8 object-cover rounded-full"
          />
        ) : (
          <BiSolidUserCircle size={40} />
        )}
        <p>{user?.username}</p>
      </div>
      {/* message text */}
      <p className="overflow-auto scrollbar-hide max-h-20 mb-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit corporis
        alias, voluptas inventore dicta ratione repudiandae ab impedit numquam
        laborum.
      </p>
      {/* message date */}
      <span className="absolute right-0 bottom-0 p-1">12-06-2000</span>
    </div>
  );
}

export default MessageCard;
