import firebase from "./firebase.js";
import firestore from "./firestore.js";

export function toggleSignIn({ email, password }) {
	if (firebase.auth().currentUser) {
		firebase.auth().signOut();
	} else {
		if (email.length < 4) {
			alert("Correo invalido.");
			return;
		}
		if (password.length < 4) {
			alert("Introduzca contraseña.");
			return;
		}
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.catch(function (error) {
				const { code, message } = error;
				if (code === "auth/wrong-password") {
					alert("Contraseña Incorrecta.");
				} else if (code === "auth/user-not-found") {
					alert("Usuario no existente");
				} else {
					alert("message");
				}
			});
	}
}

function sendPasswordReset() {
	const email = document.getElementById("email").value;
	firebase
		.auth()
		.sendPasswordResetEmail(email)
		.then(function () {
			alert("Password Reset Email Sent!");
		})
		.catch(function (error) {
			const errorCode = error.code;
			const errorMessage = error.message;
			if (errorCode == "auth/invalid-email") {
				alert(errorMessage);
			} else if (errorCode == "auth/user-not-found") {
				alert(errorMessage);
			}
			console.log(error);
		});
}
