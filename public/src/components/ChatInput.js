import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import { BsEmojiSmileFill } from "react-icons/bs";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {

  // const { msg, setMsg } = useState("")
  const [msg, setMsg] = useState({ messages: [] });

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

	const handleEmojiClick = (event, emojiObject) => {
		let message = msg;
		message += emojiObject.emoji;
		setMsg(message);
	};

  const sendChat = (event) => {
    event.preventDefault();

    console.log("MSG = " + msg)
    console.log("MSG Length = " + msg.length)

    console.log("SEND BUTTON!");
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

	return (
		<Container>
			<div className="button-container">
				<div className="emoji">
					<BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
					{showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
				</div>
			</div>
			<form className="input-container" onSubmit={(event) => sendChat(event)}>
				<input
					type="text"
					placeholder="type your message here"
					onChange={(e) => setMsg(e.target.value)}
					value={msg}
				/>
				<button type="submit">
					<IoMdSend />
				</button>
			</form>
		</Container>
	);
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: white;
  border-top: 1px solid #ededed;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
	height: 55%;
    border-radius: 2rem;
	border: 1px solid #b0b0b0;
    display: flex;
	margin-left: 9px;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: #424242;
      border: none;
      padding-left: 1rem;
      font-size: 17px;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 1rem;
	  margin-right: 8px;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #6b6b6b;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 1.3rem;
        color: #cee3f5;
      }
	  
    }
  }
  .input-container:hover {
	  background-color: #fafafa;
  }
  button:hover {
      	background-color: #545454;
	  }
`;
