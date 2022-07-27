import React from 'react'



function Login() {

	return (
		<div className="row d-flex align-items-center justify-content-center">

			<div className="mid col-4">

				<h1 className="text-center startheader">Welcome</h1>

				<form className="welcome">

					<div className="inputdiv">
						<p className=" ">Username</p>
						<div className="">
							<input className="startinputs" type="text" id="username" name="username" placeholder="" />
						</div>
					</div>

					<div className="inputdiv">
						<p className=" ">Password</p>
						<div className="text-center">
							<input className="startinputs" type="password" id="password" name="password" placeholder="" />
						</div>
					</div>

					<div className="btndiv text-center">
						<button className="startbtns" type="button">Log in</button>
						<h4>or</h4>
						<button className="startbtns" type="button">Sign up</button>
					</div>

				</form>

			</div>

		</div>
	)
}

	

		
	

export default Login;