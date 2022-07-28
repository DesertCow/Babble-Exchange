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
			setCurrentUser(
				JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
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
		if (currentUser) {
			// const data = axios.get(`${allUsersRoute}/${currentUser._id}`);
			const data = axios.get(`${allUsersRoute}/${currentUser._id}`);
			setContacts(data.data);
		}
	}, [currentUser]);


	const handleChatChange = (chat) => {
		setCurrentChat(chat);
	};

	return (
		<>
			<Container>
				<div className="container">
					{/* <div changeChat={handleChatChange}> */}
					<Contacts contacts={contacts} changeChat={handleChatChange} />
					{currentChat === "ndefined" ? (
						< Welcome />
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
  }
`;





// function Chat2() {

// 	function openCity(evt, cityName) {
// 		var i, tabcontent, tablinks;
// 		tabcontent = document.getElementsByClassName("tabcontent");
// 		for (i = 0; i < tabcontent.length; i++) {
// 			tabcontent[i].style.display = "none";
// 		}
// 		tablinks = document.getElementsByClassName("tablinks");
// 		for (i = 0; i < tablinks.length; i++) {
// 			tablinks[i].className = tablinks[i].className.replace(" active", "");
// 		}
// 		document.getElementById(cityName).style.display = "block";
// 		evt.currentTarget.className += " active";
// 	}

// 	// Get the element with id="defaultOpen" and click on it
// 	document.getElementById("defaultOpen").click();

// 	return (
// 		<div className="row d-flex align-items-center justify-content-center">

// 			<div className="chat col-7">
// 				<div className="row">

// 					<div className="tab col-3">
// 						<button className="tablinks" onclick="openCity(event, 'Friend1')" id="defaultOpen">Friend1</button>
// 						<button className="tablinks" onclick="openCity(event, 'Friend2')">Friend2</button>
// 						<button className="tablinks" onclick="openCity(event, 'Friend3')">Friend3</button>
// 						<button className="tablinks" onclick="openCity(event, 'Friend4')">Friend4</button>
// 						<button className="tablinks" onclick="openCity(event, 'Friend5')">Friend5</button>
// 						<button className="tablinks" onclick="openCity(event, 'Friend6')">Friend6</button>
// 						<button className="tablinks" onclick="openCity(event, 'Friend7')">Friend7</button>
// 						<button className="tablinks" onclick="openCity(event, 'Friend8')">Friend8</button>
// 					</div>


// 					<div className="contt col">


// 						<div id="Friend1" className="tabcontent">
// 							<h3 className="chatheader">Friend1 Chat</h3>
// 							<div className="messages">
// 								<p>Lorem Ipsum dolor</p>
// 							</div>
// 							<div className="text-center">
// 								<input className="chatinput" type="text" />
// 								<button className="sendbtn">send</button>
// 							</div>
// 						</div>

// 						<div id="Friend2" className="tabcontent">
// 							<h3 className="chatheader">Friend2 Chat</h3>
// 							<div className="messages">
// 								<p>Lorem Ipsum dolor</p>
// 							</div>
// 							<div className="text-center">
// 								<input className="chatinput" type="text" />
// 								<button className="sendbtn">send</button>
// 							</div>
// 						</div>

// 						<div id="Friend3" className="tabcontent">
// 							<h3 className="chatheader">Friend3 Chat</h3>
// 							<div className="messages">
// 								<p>Lorem Ipsum dolor</p>
// 							</div>
// 							<div className="text-center">
// 								<input className="chatinput" type="text" />
// 								<button className="sendbtn">send</button>
// 							</div>
// 						</div>

// 						<div id="Friend4" className="tabcontent">
// 							<h3 className="chatheader">Friend4 Chat</h3>
// 							<div className="messages">
// 								<p>Lorem Ipsum dolor</p>
// 							</div>
// 							<div className="text-center">
// 								<input className="chatinput" type="text" />
// 								<button className="sendbtn">send</button>
// 							</div>
// 						</div>

// 						<div id="Friend5" className="tabcontent">
// 							<h3 className="chatheader">Friend5 Chat</h3>
// 							<div className="messages">
// 								<p>Lorem Ipsum dolor</p>
// 							</div>
// 							<div className="text-center">
// 								<input className="chatinput" type="text" />
// 								<button className="sendbtn">send</button>
// 							</div>
// 						</div>

// 						<div id="Friend6" className="tabcontent">
// 							<h3 className="chatheader">Friend6 Chat</h3>
// 							<div className="messages">
// 								<p>Lorem Ipsum dolor</p>
// 							</div>
// 							<div className="text-center">
// 								<input className="chatinput" type="text" />
// 								<button className="sendbtn">send</button>
// 							</div>
// 						</div>

// 						<div id="Friend7" className="tabcontent">
// 							<h3 className="chatheader">Friend7 Chat</h3>
// 							<div className="messages">
// 								<p>Lorem Ipsum dolor</p>
// 							</div>
// 							<div className="text-center">
// 								<input className="chatinput" type="text" />
// 								<button className="sendbtn">send</button>
// 							</div>
// 						</div>

// 						<div id="Friend8" className="tabcontent">
// 							<h3 className="chatheader">Friend8 Chat</h3>
// 							<div className="messages">
// 								<p>Lorem Ipsum dolor</p>
// 							</div>
// 							<div className="text-center">
// 								<input className="chatinput" type="text" />
// 								<button className="sendbtn">send</button>
// 							</div>
// 						</div>


// 					</div>



// 				</div>
// 			</div>
// 		</div>
// 	)
// }

// export default Chat;