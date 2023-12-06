import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import "../styles/chat.css";

export const Chat = (props) => {
  const { room } = props;
  const [newMessage, setNewMessage] = useState("");
  const [image, setImage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, [room]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let messageContent = {
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room: room,
    };

    if (newMessage !== "") {
      messageContent.text = newMessage;
    }

    if (image !== "") {
      messageContent.image = image;
    }

    if (newMessage !== "" || image !== "") {
      await addDoc(messagesRef, messageContent);
      setNewMessage("");
      setImage("");
    }
  };

  return (
    <div className="chat-app">
      <div className="messages">
        {messages.map((message) => (
          <div
            className={`message ${
              message.user === auth.currentUser.displayName
                ? "my-message"
                : "other-message"
            }`}
            key={message.id}
          >
            <span className="user">
              {message.user === auth.currentUser.displayName
                ? "YOU >"
                : "< " + message.user.toUpperCase()}
            </span>
            {message.text}
            {message.image && (
              <img className="chat-message" src={message.image} alt="Chat" />
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          className="new-message-input"
          placeholder="Type your message here"
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          value={newMessage}
        />
        <label htmlFor="image-input" className="image-input-label">
          +
        </label>
        <input
          id="image-input"
          className="image-input"
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          style={{ display: "none" }} // Hide the actual file input
        />
        <button type="submit" className="send-button">
          &gt;
        </button>
      </form>
    </div>
  );
};
