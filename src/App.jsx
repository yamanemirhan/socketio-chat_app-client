import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { AppContext, socket } from "./context/appContext";
import NotFound from "./pages/NotFound";

function App() {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessages, setNewMessages] = useState({});

  return (
    <>
      <AppContext.Provider
        value={{
          socket,
          currentRoom,
          setCurrentRoom,
          members,
          setMembers,
          messages,
          setMessages,
          privateMemberMsg,
          setPrivateMemberMsg,
          rooms,
          setRooms,
          newMessages,
          setNewMessages,
        }}
      >
        <Routes>
          <Route path="/auth" element={<Auth />} />

          <Route path="/" element={<HomeLayout />}>
            <Route index={true} element={<Home />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppContext.Provider>
      <Toaster />
    </>
  );
}

export default App;
