import React, { useContext, useEffect, useRef, useState } from "react";
import MessageCard from "../components/MessageCard";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import { BiSolidUserCircle } from "react-icons/bi";

function Home() {
  const [message, setMessage] = useState("");

  const user = useSelector((state) => state.user);

  const { socket, currentRoom, setMessages, messages, privateMemberMsg } =
    useContext(AppContext);

  const messageEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function scrollToBottom() {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();

    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();

    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
  }

  const todayDate = getFormattedDate();

  socket.off("room-messages").on("room-messages", (roomMessages) => {
    setMessages(roomMessages);
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!message) return;
    const today = new Date();
    const minutes =
      today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ":" + minutes;
    const roomId = currentRoom;
    socket.emit("message-room", roomId, message, user, time, todayDate);
    setMessage("");
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-hide">
      {user && !privateMemberMsg?._id && (
        <div className="p-2">You are in the {currentRoom} room</div>
      )}

      {user && privateMemberMsg?._id && (
        <>
          <div className="flex items-center gap-3 p-1">
            Your conversation with
            <div className="flex items-center gap-1">
              {privateMemberMsg?.profilePicture ? (
                <img
                  src={privateMemberMsg?.profilePicture}
                  alt={privateMemberMsg?.username}
                  className="w-8 h-8 object-cover rounded-full"
                />
              ) : (
                <BiSolidUserCircle size={40} />
              )}
              <p>{privateMemberMsg?.username}</p>
            </div>
          </div>
        </>
      )}

      <div className="flex flex-col h-full overflow-y-auto scrollbar-hide">
        {messages.map(({ _id: date, messagesByDate }, i) => (
          <div key={i} className="flex flex-col gap-4 my-2">
            <p className="text-center">{date}</p>
            {messagesByDate?.map(({ content, time, from: sender }, idx) => (
              <div
                key={idx}
                className={`${
                  sender?.data?.username === user?.data?.username && "ml-auto"
                }`}
              >
                <MessageCard content={content} time={time} sender={sender} />
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 mt-auto border-t py-6 sticky bottom-0 z-10"
      >
        <input
          type="text"
          id="msgInput"
          placeholder="Type here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-lg px-2"
        />
        <button
          type="submit"
          className="border py-2 px-6 rounded-lg bg-orange-400 text-lg"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default Home;
