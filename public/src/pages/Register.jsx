import React from 'react'

function Register() {

	return (
	
	<div className="row d-flex align-items-center justify-content-center">

		<div className="mid col-4">

			<h1 className="text-center startheader">Sign up</h1>

			<form className="signup">

				<div className="inputdiv">
					<p className=" ">Email</p>
					<div className="">
						<input className="startinputs" type="text" id="signupemail" name="signupemail" placeholder="" />
					</div>
				</div>

				<div className="inputdiv">
					<p className=" ">Username</p>
					<div className="">
						<input className="startinputs" type="text" id="signupusername" name="signupusername" placeholder="" />
					</div>
				</div>

				<div className="inputdiv">
					<p className=" ">Password</p>
					<div className="text-center">
						<input className="startinputs" type="password" id="signuppassword" name="signuppassword" placeholder="" />
					</div>
				</div>

				<div className="inputdiv">
					<p className=" ">Confirm password</p>
					<div className="text-center">
						<input className="startinputs" type="password" id="signuppasswordconfirm" name="signuppasswordconfirm" placeholder="" />
					</div>
				</div>

				<div className="btndiv text-center">
					<button className="startbtns" type="button">Submit</button>
				</div>

			</form>

		</div>

	</div>

	)
}

export default Register;