import firebase from "./firebase.js";

const firestore = firebase.firestore();
const settings = {};
firestore.enablePersistence({ synchronizeTabs: true });
firestore.settings(settings);

export default firestore;
