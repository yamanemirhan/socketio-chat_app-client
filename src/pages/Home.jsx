import React from "react";
import MessageCard from "../components/MessageCard";

function Home() {
  return (
    <div className="flex flex-col h-full">
      <h1>Home</h1>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-4">
          <MessageCard />
        </div>
        <div className="flex flex-col gap-4 ml-auto">
          <MessageCard />
        </div>
        <div className="flex flex-col gap-4">
          <MessageCard />
        </div>
      </div>
      <div className="flex gap-2 mt-auto border-t py-6">
        <input
          type="text"
          placeholder="Write..."
          className="w-full rounded-lg px-2"
        />
        <button className="border py-2 px-6 rounded-lg bg-orange-400 text-lg">
          Send
        </button>
      </div>
    </div>
  );
}

export default Home;
