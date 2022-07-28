import React, { useState, useEffect } from "react";
import axios from "axios";
import { loginRoute, registerRoute } from "../utils/apiRoutes";

// React Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Enable Navigation via Router DOM
import { useNavigate, Link } from "react-router-dom";

function Login() {


	const navigate = useNavigate();
	const [values, setValues] = useState({ username: "", password: "" });
	const toastOptions = {
		position: "bottom-right",
		autoClose: 8000,
		pauseOnHover: true,
		draggable: true,
		theme: "dark",
	};

	useEffect(() => {
		if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
			navigate("/");
		}
	}, []);

	const handleChange = (event) => {
		setValues({ ...values, [event.target.name]: event.target.value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		console.log("EVENT SUBMIT!" + event);

		// TODO: Add validateForm() method
		// if (validateForm()) {
		if (true) {
			const { username, password } = values;
			const { data } = await axios.post(loginRoute, {
				username,
				password,
			});

			if (data.status === false) {
				toast.error(data.msg, toastOptions);
			}
			if (data.status === true) {
				localStorage.setItem(
					process.env.REACT_APP_LOCALHOST_KEY,
					JSON.stringify(data.user)
				);
				toast.success("Login Was Successful", toastOptions);
				navigate("/Chat");
			}
		}
	};


	const handleSignUp = async (event) => {
		// navigate("/Register");
		event.preventDefault();

		console.log("Signup Event: " + event);


		// TODO: Add validateForm() method
		if (true) {

			const { username, password, email } = values;
			const { data } = await axios.post(registerRoute, {
				email,
				username,
				password,
			});



			toast.success("Account Sign-Up Successful", toastOptions);
			navigate("/Chat");
		}
	};

	return (
		<div className="row d-flex align-items-center justify-content-center">

			<div className="mid col-4">

				<h1 className="text-center startheader">Welcome</h1>

				<form className="welcome">

					<div className="inputdiv">
						<p className=" ">Username</p>
						<div className="">
							<input
								className="startinputs"
								type="text"
								id="username"
								name="username"
								placeholder=""
								onChange={(e) => handleChange(e)}
							/>
						</div>
					</div>

					<div className="inputdiv">
						<p className=" ">Password</p>
						<div className="text-center">
							<input
								className="startinputs"
								type="password"
								id="password"
								name="password"
								placeholder=""
								onChange={(e) => handleChange(e)}
							/>
						</div>
					</div>

					<div className="btndiv text-center">
						<button className="startbtns" type="button" action="" onClick={(event) => handleSubmit(event)}>Log in</button>
						<h4>or</h4>
						<br></br>
						<div className="inputdiv">
							<p className=" ">Email</p>
							<div className="text-center">
								<input
									className="startinputs"
									type="email"
									id="email"
									name="email"
									placeholder=""
									onChange={(e) => handleChange(e)}
								/>
							</div>
						</div>
						<button className="startbtns" type="button" onClick={(event) => handleSignUp(event)}>Sign up</button>
					</div>

				</form>

			</div >
			<ToastContainer />
		</div >

	);
}






export default Login;