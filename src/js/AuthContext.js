import React, { useState, useEffect } from "react";
import firebase from "./firebase/firebase";

const AuthContext = React.createContext();

function AuthProvider({ children }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userData, setUserData] = useState({
		username: "",
	});

	function togglelogIn() {
		setIsLoggedIn(!isLoggedIn);
	}

	function logOut() {
		console.log("here");
		firebase.auth().signOut();
	}

	useEffect(() => {
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				setUserData({ email: user.email, id: user.uid });
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
				setUserData(null);
			}
		});
	}, []);

	return <AuthContext.Provider value={{ isLoggedIn, logOut, userData }}> {children} </AuthContext.Provider>;
}

export { AuthProvider, AuthContext };
