import React, { useState } from "react";
import { toggleSignIn } from "../firebase/auth";

function LoginForm() {
	const [loginData, setLoginData] = useState({
		email: "",
		password: "",
	});

	function handleChange(e) {
		const { name, value } = e.target;
		setLoginData({
			...loginData,
			[name]: value,
		});
	}
	function handleSubmit(e) {
		e.preventDefault();
		toggleSignIn({
			email: loginData.email,
			password: loginData.password,
		});
	}

	return (
		<form onSubmit={handleSubmit} className="form">
			<label>
				Correo
				<input type="text" name="email" onChange={handleChange} value={loginData.email} />
			</label>
			<label>
				Password
				<input type="password" name="password" onChange={handleChange} value={loginData.password} />
			</label>
			<button>Login</button>
		</form>
	);
}

export default LoginForm;
