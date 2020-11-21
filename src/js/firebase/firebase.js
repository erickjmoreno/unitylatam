// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";

var config = {
	apiKey: "AIzaSyBGa0TeEBq10qTvdEU5a3M0YkzrnhQoxCk",
	authDomain: "hermandadunity.firebaseapp.com",
	databaseURL: "https://hermandadunity.firebaseio.com",
	projectId: "hermandadunity",
	storageBucket: "hermandadunity.appspot.com",
	messagingSenderId: "119881120726",
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
