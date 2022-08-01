import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import loader from "../img/loading.gif";
import { Buffer } from "buffer";

import { allUsersRoute, host } from "../utils/apiRoutes";
import ChatContainer from "../components/ChatContainer";

import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";


export default function Chat() {

	const navigate = useNavigate();
	// const socket = useRef();
	const socket = useRef();
	const [isLoading, setIsLoading] = useState(true);

	const [contacts, setContacts] = useState([]);
	const [currentChat, setCurrentChat] = useState([]);
	const [currentUser, setCurrentUser] = useState(undefined);

	useEffect(() => {
		if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
			navigate("/login");
		} else {
			setCurrentUser(JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
			);
		}
	}, []);

	useEffect(() => {
		if (currentUser) {
			socket.current = io(host);
			socket.current.emit("add-user", currentUser._id);
		}
	}, [currentUser]);

	useEffect(() => {

		async function fetchContactData() {

			// TODO: Fix Temp Workaround, should use currentUser._id for ID..
			let finalApiRoute = `${allUsersRoute}/62e2dd730d5d64d0c8d9d0de`;
			let tempID = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))._id;
			// console.log("TempID " + tempID)
			// console.log(`${allUsersRoute}/${tempID}`)
			const data = await axios.get(`${allUsersRoute}/${tempID}`);
			setContacts(data.data);
			setIsLoading(false);

			// if (currentUser) {
			//console.log("API Route: " + allUsersRoute + "/" + JSON.stringify(currentUser));

		}
		fetchContactData();
	}, [currentUser]);

	const handleChatChange = async (chat) => {

		await setCurrentChat(chat);
	};

	return (
		<>
			{isLoading ? (
				<Container>
					<img src={loader} alt="loader" className="loader" />
				</Container>
			) : (
				<Container>
					<div className="row">
						<div className="col-12 text-center logodiv">
							<img src={require("../img/babble_logo.png")}
								className="logo"
								alt="babble logo" />
						</div>
					</div>

					<div className="container">
						<Contacts contacts={contacts} className="contacts" changeChat={handleChatChange} />
						{currentChat === undefined ? (
							<Welcome />
						) : (
							<ChatContainer currentChat={currentChat} socket={socket} />
						)}
					</div>
				</Container>
			)}
		</>
	);
}

const Container = styled.div`
  width: 100vw;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  
  align-items: center;
  background-color: rgb(249, 252, 252);
  .container {
	padding-left: 0 !important;
	padding-right: 0 !important;
    height: 85vh;
    width: 65vw;
	border: .8px solid #b7c8cf6f;
	margin-bottom: 88px;
    background-color: white;
	border-radius: 7px;
    display: grid;
	box-shadow: 0px 10px 30px rgba(102, 118, 169, 0.099);
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
		.contact {

			width: 90%
		}
  }
`;