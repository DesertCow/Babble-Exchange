import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";

import { allUsersRoute, host } from "../utils/apiRoutes";
import ChatContainer from "../components/ChatContainer";

import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";


export default function Chat() {

	const navigate = useNavigate();
	const socket = useRef();

	const [contacts, setContacts] = useState([]);
	const [currentChat, setCurrentChat] = useState(undefined);
	const [currentUser, setCurrentUser] = useState(undefined);

	useEffect(() => {
		if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
			navigate("/login");
		} else {
			setCurrentUser(JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)))
			console.log("User Set = " + JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)))
		}
	}, []);
	useEffect(() => {
		if (currentUser) {
			socket.current = io(host);
			socket.current.emit("add-user", currentUser._id);
		}
	}, [currentUser]);

	useEffect(async () => {
		// if (currentUser) {
		console.log("API Route: " + allUsersRoute + "/" + JSON.stringify(currentUser));
		let finalApiRoute = `${allUsersRoute}/62e2dd730d5d64d0c8d9d0de`;
		console.log("API Final Route: " + finalApiRoute)

		// TODO: Fix Hardcode work-around for API Call
		//const data = axios.get(`${allUsersRoute}/${currentUser._id}`);
		//const data = axios.get(`${finalApiRoute}`);
		const data = await axios.get(`http://localhost:3001/api/auth/allusers/62e2db360d5d64d0c8d9d0ca`);
		// console.log("DATA = " + data.data);
		setContacts(data.data);
		// }
	}, []);

	const handleChatChange = (chat) => {
		setCurrentChat(chat);
	};

	return (
		<>
			<Container>
				<div className="container">
					<Contacts contacts={contacts} changeChat={handleChatChange} />
					{currentChat === undefined ? (
						<Welcome />
					) : (
						<ChatContainer currentChat={currentChat} socket={socket} />
					)}
				</div>
			</Container>
		</>
	);

}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
		.contacts {
			height: 80%;
		}
  }
`;