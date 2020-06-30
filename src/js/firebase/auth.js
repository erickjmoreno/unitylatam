import firebase from "./firebase.js";
import firestore from "./firestore.js";

const _ = null;

export function toggleSignIn({ email, password }) {
	console.log("Here");
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
				const errorCode = error.code;
				const errorMessage = error.message;
				if (errorCode === "auth/wrong-password") {
					alert("Contraseña Incorrecta.");
				} else {
					alert(errorMessage);
				}
				console.log(error);
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

function initApp() {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			const current_user = true;
			const displayName = user.displayName;
			const email = user.email;
			const photoURL = user.photoURL;
			const isAnonymous = user.isAnonymous;
			const uid = user.uid;
			const providerData = user.providerData;

			document.getElementById("LogStatus").textContent = email;
			document.getElementById("adminbutton").style.display = "inline-block";
			document.getElementById("officerbutton").style.display = "inline-block";
			document.getElementById("desconectar").innerHTML =
				'<button class="button" id="botondesconectar" name="signout">Desconectar</button>';
			document.getElementById("botondesconectar").addEventListener("click", toggleSignIn, false);
			document.getElementById("sign-in").textContent = "Sign out";
			document.getElementById("autenticacion").style.display = "none";
		} else {
			document.getElementById("LogStatus").textContent = "";
			document.getElementById("sign-in").textContent = "Sign in";
			document.getElementById("autenticacion").style.display = "";
			document.getElementById("desconectar").innerHTML = "";
			current_user = false;
		}
		document.getElementById("sign-in").disabled = false;
	});
	document.getElementById("sign-in").addEventListener("click", toggleSignIn, false);
}

export default initApp;
