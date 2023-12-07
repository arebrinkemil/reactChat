import React, { useState } from "react";
import "./App.css";
import { Auth } from "./components/Auth";
import Cookies from "universal-cookie";
import { Chat } from "./components/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import EnterRoom from "./components/EnterRoom";
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  const backToEnterRoom = () => {
    setRoom(null);
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
        <Chat room={room} backToEnterRoom={backToEnterRoom} />
      ) : (
        <EnterRoom setRoom={setRoom} />
      )}

      <div className="sign-out">
        <button onClick={signUserOut}> SIGN OUT</button>
      </div>
    </>
  );
}

export default App;
