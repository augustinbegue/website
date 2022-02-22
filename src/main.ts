import App from './App.svelte';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCqkJPWKOmwLEdn4qCFDhZZ1Lxf9TDAOCA",
	authDomain: "beguecc-b9bce.firebaseapp.com",
	projectId: "beguecc-b9bce",
	storageBucket: "beguecc-b9bce.appspot.com",
	messagingSenderId: "896078747473",
	appId: "1:896078747473:web:9f489ce6e17f7cc5c12570",
	measurementId: "G-T1067N64YS"
};

// Initialize Firebase
const fbapp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(fbapp);
export const firestore = getFirestore(fbapp);

const app = new App({
	target: document.body,
});

export default app;