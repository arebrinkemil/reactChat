import React, { useState, useRef } from "react";
import "./App.css";
import { Auth } from "./components/Auth";
import Cookies from "universal-cookie";
import { Chat } from "./components/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setRoom(roomInputRef.current.value);
    }
  };

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    <>
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="room">
          <label>ENTER ROOM: </label>
          <input
            placeholder="NAME HERE"
            className="room-number"
            ref={roomInputRef}
            onKeyPress={handleKeyPress}
          />
          <button onClick={() => setRoom(roomInputRef.current.value)}>
            &gt;
          </button>
        </div>
      )}

      <div className="sign-out">
        <button onClick={signUserOut}> Sign Out</button>
      </div>
    </>
  );
}

export default App;
