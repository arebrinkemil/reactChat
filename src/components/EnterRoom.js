import React, { useRef } from "react";

function EnterRoom({ setRoom }) {
  const roomInputRef = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setRoom(roomInputRef.current.value);
    }
  };

  return (
    <div className="room">
      <label>ENTER ROOM: </label>
      <input
        placeholder="NAME HERE"
        className="room-number"
        ref={roomInputRef}
        onKeyPress={handleKeyPress}
      />
      <button onClick={() => setRoom(roomInputRef.current.value)}>&gt;</button>
    </div>
  );
}

export default EnterRoom;
