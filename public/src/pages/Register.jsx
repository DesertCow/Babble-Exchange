import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { loginRoute, registerRoute } from "../utils/apiRoutes";



function Register() {

	const [values, setValues] = useState({ email: "", username: "", password: "", passwordconfirm: "" });
	
	const navigate = useNavigate();

	const toastOptions = {
		position: "bottom-right",
		autoClose: 8000,
		pauseOnHover: true,
		draggable: true,
		theme: "dark",
	};
	const handleSignUp = async (event) => {
		event.preventDefault();
		

		console.log("Signup Event: " + event);


		// TODO: Add validateForm() method
		if (true) {

			const { email, username, password, passwordconfirm } = values;
			const { data } = await axios.post(registerRoute, {
				email,
				username,
				password,
				passwordconfirm
			});

			if (data.status === false) {
				toast.error("Account Creation Failed!", toastOptions);
			}
			if (data.status === true) {
				toast.success("Account Sign-Up Successful", toastOptions);
				navigate("/");
			}


		}
	};

	return (
	
	<div className="row d-flex align-items-center justify-content-center">

		<div className="mid col-4">

			<h1 className="text-center startheader">Sign up</h1>

			<form className="signup">

				<div className="inputdiv">
					<p className=" ">Email</p>
					<div className="">
						<input 
							className="startinputs" 
							type="text" 
							id="email" 
							name="email" 
							placeholder="" 
						/>
					</div>
				</div>

				<div className="inputdiv">
					<p className=" ">Username</p>
					<div className="">
						<input 
							className="startinputs" 
							type="text" 
							id="username" 
							name="username" 
							placeholder="" 
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
						/>
					</div>
				</div>

				<div className="inputdiv">
					<p className=" ">Confirm password</p>
					<div className="text-center">
						<input 
							className="startinputs" 
							type="password" 
							id="passwordconfirm" 
							name="passwordconfirm" 
							placeholder="" />
					</div>
				</div>

				<div className="btndiv text-center">
						<button 
							className="startbtns" 
							type="button" 
							onClick={(event) => handleSignUp(event)}>Submit
						</button>
				</div>

			</form>

		</div>

	</div>

	)
}

export default Register;