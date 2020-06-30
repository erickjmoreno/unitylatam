import firestore from "./firestore.js";
import firebase from "./firebase.js";

export const rankRef = firestore.collection("Unity").doc("raiderio").collection("rank");
export const progressRef = firestore.collection("Unity").doc("progress");
export const newsRef = firestore.collection("Unity").doc("news").collection("general");
export const youTubeChannelsDataRef = firestore.collection("Unity").doc("right").collection("general");
export const homePageRef = firestore.collection("Unity").doc("homePage");
export const applysRef = firestore.collection("Unity").doc("applies");
export const core1ApplysRef = firestore.collection("Unity").doc("applys").collection("core1");
export const core2ApplysRef = firestore.collection("Unity").doc("applys").collection("core2");
export const sendToMail = firebase.functions().httpsCallable("sendCustomAnswerToEmail");
export const rosterRef = firestore.collection("Unity").doc("roster");
export const webVersionRef = firestore.collection("Unity").doc("WebVersion");
