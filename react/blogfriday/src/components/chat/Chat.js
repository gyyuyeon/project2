import React, { useState, useEffect } from "react";
import "./Chat.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../../toolkit/actions/chat_Action";

function Chat() {
  const [webSocket, setWebSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [userId, setUserId] = useState("CCC");
  const [recipientId, setRecipientId] = useState("");
  const [view, setView] = useState(0); // 추가: 화면 상태 (0: 친구 목록, 1: 채팅)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const connect = () => {
    if (!webSocket || webSocket.readyState === WebSocket.CLOSED) {
      const ws = new WebSocket(`ws://localhost:8090/ws/chat?userId=${userId}`);
      ws.onopen = () => console.log("Connected to the chat server");
      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, message]);
      };
      ws.onerror = (event) => console.error("WebSocket error:", event);
      ws.onclose = (event) =>
        console.log("WebSocket connection closed:", event);
      setWebSocket(ws);
    } else {
      console.log("WebSocket is already connected or connecting.");
    }
  };

  const sendMessage = () => {
    if (
      webSocket &&
      inputMessage !== "" &&
      userId !== "" &&
      recipientId !== ""
    ) {
      const messageData = {
        sender_id: userId,
        message: inputMessage,
        recipient_id: recipientId,
      };
      webSocket.send(JSON.stringify(messageData));
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setInputMessage("");
    }
  };

  const disconnect = () => {
    if (webSocket) {
      webSocket.close();
    }
  };

  const { friendList } = useSelector((state) => state.chat);

  const [userCode, setUserCode] = useState({
    user_code1: userId,
    user_code2: "",
  });

  const navihome = () => {
    navigate("/chat/home");
  };

  const navidot = () => {
    navigate("/chat/dot");
  };

  const naviset = () => {
    navigate("/chat/set");
  };

  useEffect(() => {
    connect();
    dispatch(chatActions.getFriendList(userCode.user_code1));
  }, [userCode]);

  ///

  const [showOptions, setShowOptions] = useState(false);
  const [optionsPosition, setOptionsPosition] = useState({ x: 0, y: 0 });
  const [selectedMessage, setSelectedMessage] = useState(null);
  // 메시지 클릭 시 동작할 핸들러
  const handleMsgClick = (msg, event) => {
    event.stopPropagation(); // 상위로 이벤트 전파 방지
    const x = event.clientX;
    const y = event.clientY;

    setOptionsPosition({ x, y });
    setShowOptions(true);
    setSelectedMessage(msg);
  };

  const hiddenDivStyle = {
    position: "absolute",
    left: `${optionsPosition.x}px`,
    top: `${optionsPosition.y}px`,
    display: showOptions ? "block" : "none",
    // 추가 스타일 설정
  };

  // 숨겨진 div 밖을 클릭했을 때 숨겨진 div를 숨깁니다.
  useEffect(() => {
    const handleClickOutside = () => setShowOptions(false);
    if (showOptions) {
      window.addEventListener("click", handleClickOutside);
    }
    return () => window.removeEventListener("click", handleClickOutside);
  }, [showOptions]);

  const nlpsearch = (text) => {
    dispatch(chatActions.getNLPsearch(text));
  };

  return (
    <>
      {view === 0 && (
        <div className="chat">
          <div className="chat_menubar">
            <div className="blank0"></div>
            <div className="chat_menubar_button_f" onClick={navihome}></div>
            <div className="chat_menubar_button_c_c"></div>
            <div className="chat_menubar_button_d" onClick={navidot}></div>
            <div className="chat_menubar_button_s" onClick={naviset}></div>
          </div>
          <div className="chat_body">
            <div className="chat_header"></div>
            <div>
              <div className="chat_friendlist">
                {friendList &&
                  friendList.map((chat) => (
                    <div
                      className="chat_friendbox"
                      onClick={() => {
                        if (
                          !webSocket ||
                          webSocket.readyState === WebSocket.CLOSED
                        ) {
                          connect(); // Reconnect if disconnected ////++
                        }
                        setRecipientId(chat.user_code2);
                        setView(1);
                      }}
                    >
                      <div className="chat_profileimg"></div>
                      <div className="chat_name" key={chat.num}>
                        {chat.user_code2}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="chat">
        {view === 1 && (
          <div className="chat_talkbox">
            <div>{recipientId}</div>
            <button
              onClick={() => {
                setView(0);
              }}
            >
              뒤로
            </button>
            <ul>
              {messages
                .filter(
                  (msg) =>
                    (msg.sender_id === userId &&
                      msg.recipient_id === recipientId) ||
                    (msg.sender_id === recipientId &&
                      msg.recipient_id === userId)
                )
                .map((msg, index) => (
                  <li
                    key={index}
                    className={`message ${
                      msg.sender_id === userId ? "my-message" : "other-message"
                    }`}
                    onClick={(e) => handleMsgClick(msg, e)}
                  >
                    {msg.sender_id === userId ? "" : `${msg.sender_id}: `}
                    {msg.message}
                  </li>
                ))}
            </ul>
            <div style={hiddenDivStyle} className="optionsDiv">
              {/* 선택된 메시지 정보를 사용하는 버튼 예시 */}
              {selectedMessage && (
                <button
                  onClick={() => {
                    console.log(`작업 실행: ${selectedMessage.message}`);
                    nlpsearch(selectedMessage.message);
                  }}
                >
                  선택한 메세지: {selectedMessage.message}
                </button>
              )}
            </div>
            <div className="chat_message">
              <input
                className="chat_input_message"
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />

              <button
                onClick={sendMessage}
                disabled={
                  !inputMessage.trim() || !userId.trim() || !recipientId
                }
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Chat;
