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

	const inputUpdated = (event) => {
		setValues({ ...values, [event.target.name]: event.target.value });
	};

	const handleSignUp = async (event) => {
		event.preventDefault();

		// TODO: Add validateForm() method
		if (true) {

			const { email, username, password, passwordconfirm } = values;

			// console.log("User Data: " + email + "||" + username + "||" + password + "||" + passwordconfirm);

			const { data } = await axios.post(registerRoute, {
				email,
				username,
				password
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
						<p className="inputlabel">Email</p>
						<div className="">
							<input
								className="startinputs"
								type="text"
								id="email"
								name="email"
								placeholder=""
								onChange={(e) => inputUpdated(e)}
							/>
						</div>
					</div>

					<div className="inputdiv">
						<p className="inputlabel">Username</p>
						<div className="">
							<input
								className="startinputs"
								type="text"
								id="username"
								name="username"
								placeholder=""
								onChange={(e) => inputUpdated(e)}
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
								onChange={(e) => inputUpdated(e)}
							/>
						</div>
					</div>

					<div className="inputdiv">
						<p className="inputlabel">Confirm password</p>
						<div className="text-center">
							<input
								className="startinputs"
								type="password"
								id="passwordconfirm"
								name="passwordconfirm"
								placeholder=""
								onChange={(e) => inputUpdated(e)}
							/>
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