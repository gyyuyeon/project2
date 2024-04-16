import React from "react";
import "./Chat.css";
import { useNavigate } from "react-router-dom";

const ChatSet = () => {
  const navigate = useNavigate();

  const navichat = () => {
    navigate("/chat");
  };
  const navihome = () => {
    navigate("/chat/home");
  };

  const navidot = () => {
    navigate("/chat/dot");
  };

  return (
    <>
      <div className="chat">
        <div className="chat_menubar">
          <div className="blank0"></div>
          <div className="chat_menubar_button_f" onClick={navihome}></div>
          <div className="chat_menubar_button_c" onClick={navichat}></div>
          <div className="chat_menubar_button_d " onClick={navidot}></div>
          <div className="chat_menubar_button_s_c"></div>
        </div>

        <div className="chat_body">
          <div>
            <div className="chat_header"></div>
            <div className="chat_friendlist"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatSet;
