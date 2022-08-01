
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/apiRoutes";


export default function ChatContainer({ currentChat, socket }) {

  const [messageState, setMessages] = useState({ messages: [] });
  // const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);


  useEffect(() => {

    async function fetchLocalData() {

      const data = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));

      console.log("Sender:" + JSON.stringify(currentChat._id));
      console.log("Reciver:" + JSON.stringify(data._id));
      const response = await axios.post(recieveMessageRoute, {
        sender: currentChat._id,
        recipient: data._id,
        // recipient: currentChat._id,
        // sender: "62e6737754b047e1094f8f7b",
        // sender: "62e6738b54b047e1094f8f80",
        // recipient: "62e6737754b047e1094f8f7b",
      });

      // from: data._id, to: currentChat._id,


      console.log("########################################");

      //TODO: response.data contains valid msg data, just need to set to messageState variable...
      console.log(response.data);
      setMessages({ ...messageState, messages: response.data });
      setTimeout(() => console.log(messageState), 3000);

    }
    fetchLocalData();
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);


  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    socket.current.emit("send-msg", {
      recipient: currentChat._id,
      sender: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      sender: data._id,
      recipient: currentChat._id,
      message: msg,
    });

    // const msgs = [...messageState];
    // console.log(JSON.stringify(messageState));
    // msgs.push({ fromSelf: true, message: msg });
    // setMessages({ ...messageState, messages: msgs });
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  // useEffect(() => {
  //   scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  return (
    <Container>
      {/* <h1>Selected Chat: {currentChat.username}----[{currentChat._id}]--- {currentChat.email}</h1>
      <h1>Hello World!</h1>
      {JSON.stringify(messageState.messages)} */}
      <div className="chat-header">
        <div className="user-details">
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        {/* <Logout /> */}
      </div>
      <div className="chat-messages">
        {messageState.messages.map((message) => {
          return (
            // <div ref={scrollRef} key={uuidv4()}>
            <div key={uuidv4()}>
              <div
                className={`message ${message.fromSelf ? "sended" : "recieved"
                  }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );

}

const Container = styled.div`
  display: grid;
  grid-template-rows: 9% 77% 14%;
  border-radius: 0px 7px 7px 0px;
  gap: 0.1rem;
  background-color: rgb(255,255,255);
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
	border-bottom: .8px solid #b8b8b8;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: #474747;
		  font-size: 22px;
		  font-weight: 600;
        }
		
		
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #e0e0e0;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #737373;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #f5f5f5;
		border: 1px solid #b0b0b0;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: white;
		border: 1px solid #b0b0b0;
      }
    }
  }
`;