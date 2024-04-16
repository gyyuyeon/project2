import React from "react";
import "./Chat.css";
import { useNavigate } from "react-router-dom";

const Chatdot = () => {
  const navigate = useNavigate();

  const navichat = () => {
    navigate("/chat");
  };
  const navihome = () => {
    navigate("/chat/home");
  };

  const naviset = () => {
    navigate("/chat/set");
  };

  return (
    <>
      <div className="chat">
        <div className="chat_menubar">
          <div className="blank0"></div>
          <div className="chat_menubar_button_f" onClick={navihome}></div>
          <div className="chat_menubar_button_c" onClick={navichat}></div>
          <div className="chat_menubar_button_d_c"></div>
          <div className="chat_menubar_button_s" onClick={naviset}></div>
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

export default Chatdot;
