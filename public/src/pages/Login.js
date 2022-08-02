import React, { useState, useEffect } from "react";
import axios from "axios";
import { loginRoute, registerRoute } from "../utils/apiRoutes";
// React Toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Enable Navigation via Router DOM
// import { useNavigate, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
			// navigate("/");
		}
	}, []);

	const handleChange = (event) => {
		setValues({ ...values, [event.target.name]: event.target.value });
	};

	const validateForm = () => {
		const { username, password } = values;
		if (username === "" && password === "") {
			toast.error("Username and Password is required.", toastOptions);
			return false;
		} else if (username === "") {
			toast.error("Username is required.", toastOptions);
			return false;
		} else if (password === "") {
			toast.error("Password is required.", toastOptions);
			return false;
		}
		else {
			return true;
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		console.log("Valid? = " + validateForm() + " || " + JSON.stringify(values))

		if (validateForm()) {
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
				navigate("/chat");
			}
		}
	};


	const handleSignUp = async (event) => {
		// navigate("/Register");
		event.preventDefault();

		// console.log("Signup Event: " + event);

		navigate("/Register");

	};

	return (
		<div className="row d-flex align-items-center justify-content-center">

			<div className="col-12 text-center ">
				<img src={require("../img/babble_logo.png")}
					className="logo"
					alt="babble logo" />
			</div>

			<div className="mid col-4">

				<h1 className="text-center welcometo">Welcome to</h1>
				<h1 className="text-center head">Babble Exchange</h1>

				<form className="welcome">

					<div className="inputdiv">
						<p className="inputlabel">Username</p>
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
						<p className="inputlabel">Password</p>
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
						<h4 className="m-3 h4">or</h4>
						<button className="startbtns m-2" type="button" onClick={(event) => handleSignUp(event)}>Sign up</button>
					</div>

				</form>

			</div >
		</div >

	);
}

export default Login;