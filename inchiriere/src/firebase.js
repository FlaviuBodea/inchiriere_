import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "AUTH_DOMAIN",
  projectId: "masini-92bf5",
  storageBucket: "STORAGE_BUCKET",
  messagingSenderId: "MESSAGING_SENDER_ID",
  appId: "APP_ID",
};

// Inițializează Firebase
firebase.initializeApp(firebaseConfig);

// Obține o referință către baza de date Firestore
const db = firebase.firestore();

export default db;
