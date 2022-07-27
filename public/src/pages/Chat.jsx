import React from 'react'

function Chat() {
	
	function openCity(evt, cityName) {
		var i, tabcontent, tablinks;
		tabcontent = document.getElementsByClassName("tabcontent");
		for (i = 0; i < tabcontent.length; i++) {
			tabcontent[i].style.display = "none";
		}
		tablinks = document.getElementsByClassName("tablinks");
		for (i = 0; i < tablinks.length; i++) {
			tablinks[i].className = tablinks[i].className.replace(" active", "");
		}
		document.getElementById(cityName).style.display = "block";
		evt.currentTarget.className += " active";
	}

	// Get the element with id="defaultOpen" and click on it
	document.getElementById("defaultOpen").click();

	return (
		<div className="row d-flex align-items-center justify-content-center">

			<div className="chat col-7">
				<div className="row">

					<div className="tab col-3">
						<button className="tablinks" onclick="openCity(event, 'Friend1')" id="defaultOpen">Friend1</button>
						<button className="tablinks" onclick="openCity(event, 'Friend2')">Friend2</button>
						<button className="tablinks" onclick="openCity(event, 'Friend3')">Friend3</button>
						<button className="tablinks" onclick="openCity(event, 'Friend4')">Friend4</button>
						<button className="tablinks" onclick="openCity(event, 'Friend5')">Friend5</button>
						<button className="tablinks" onclick="openCity(event, 'Friend6')">Friend6</button>
						<button className="tablinks" onclick="openCity(event, 'Friend7')">Friend7</button>
						<button className="tablinks" onclick="openCity(event, 'Friend8')">Friend8</button>
					</div>


					<div className="contt col">


						<div id="Friend1" className="tabcontent">
							<h3 className="chatheader">Friend1 Chat</h3>
							<div className="messages">
								<p>Lorem Ipsum dolor</p>
							</div>
							<div className="text-center">
								<input className="chatinput" type="text" />
									<button className="sendbtn">send</button>
							</div>
						</div>

						<div id="Friend2" className="tabcontent">
							<h3 className="chatheader">Friend2 Chat</h3>
							<div className="messages">
								<p>Lorem Ipsum dolor</p>
							</div>
							<div className="text-center">
								<input className="chatinput" type="text" />
									<button className="sendbtn">send</button>
							</div>
						</div>

						<div id="Friend3" className="tabcontent">
							<h3 className="chatheader">Friend3 Chat</h3>
							<div className="messages">
								<p>Lorem Ipsum dolor</p>
							</div>
							<div className="text-center">
								<input className="chatinput" type="text" />
									<button className="sendbtn">send</button>
							</div>
						</div>

						<div id="Friend4" className="tabcontent">
							<h3 className="chatheader">Friend4 Chat</h3>
							<div className="messages">
								<p>Lorem Ipsum dolor</p>
							</div>
							<div className="text-center">
								<input className="chatinput" type="text" />
									<button className="sendbtn">send</button>
							</div>
						</div>

						<div id="Friend5" className="tabcontent">
							<h3 className="chatheader">Friend5 Chat</h3>
							<div className="messages">
								<p>Lorem Ipsum dolor</p>
							</div>
							<div className="text-center">
								<input className="chatinput" type="text" />
									<button className="sendbtn">send</button>
							</div>
						</div>

						<div id="Friend6" className="tabcontent">
							<h3 className="chatheader">Friend6 Chat</h3>
							<div className="messages">
								<p>Lorem Ipsum dolor</p>
							</div>
							<div className="text-center">
								<input className="chatinput" type="text" />
									<button className="sendbtn">send</button>
							</div>
						</div>

						<div id="Friend7" className="tabcontent">
							<h3 className="chatheader">Friend7 Chat</h3>
							<div className="messages">
								<p>Lorem Ipsum dolor</p>
							</div>
							<div className="text-center">
								<input className="chatinput" type="text" />
									<button className="sendbtn">send</button>
							</div>
						</div>

						<div id="Friend8" className="tabcontent">
							<h3 className="chatheader">Friend8 Chat</h3>
							<div className="messages">
								<p>Lorem Ipsum dolor</p>
							</div>
							<div className="text-center">
								<input className="chatinput" type="text" />
									<button className="sendbtn">send</button>
							</div>
						</div>


					</div>



				</div>
			</div>
		</div>
	)
}

export default Chat;