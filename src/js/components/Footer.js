import React, { useContext } from "react";
import logoshort from "../../images/unityshort.png";
import LoginForm from "./LoginForm";
import { AuthContext } from "../AuthContext";
import LogOut from "./LogOut";

function Footer() {
	const { isLoggedIn, userData, logOut } = useContext(AuthContext);

	return (
		<div className="footer">
			<div className="footerLinks">
				<a href="https://raider.io/guilds/us/ragnaros/Unity" target="_blank">
					Raider.IO Profile
				</a>
				<br />
				<a href="https://www.facebook.com/HermandadUnity/" target="_blank">
					Facebook Profile
				</a>
			</div>
			<img src={logoshort} alt="Unity Logo" />
			{isLoggedIn ? <LogOut email={userData.email} logOut={logOut} /> : <LoginForm />}
			<div className="footerAbout">
				<span>
					Diseño por <strong> Erick Moreno </strong>
				</span>
			</div>
		</div>
	);
}

export default Footer;
