import express from "express";
import cors from "cors";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const port = 5050;
const app = express();

app.use(cors());
app.use(express.json());

const firebaseConfig = {
  apiKey: "AIzaSyBKdAySc9iK4tqzGTXbYiOUXh9o_NucuKQ",
  authDomain: "inchiriere-d8796.firebaseapp.com",
  projectId: "inchiriere-d8796",
  storageBucket: "inchiriere-d8796.appspot.com",
  messagingSenderId: "121700957174",
  appId: "1:121700957174:web:748c7752740e1dab1a25d7",
  measurementId: "G-YMKBTCMCLW",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const MasiniCollection = collection(db, "Masini");

app.get("/", async (req, res) => {
  try {
    const snapshot = await getDocs(MasiniCollection);
    const Masini = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).send(Masini);
  } catch (error) {
    console.error("Error fetching data from Firestore:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log("Server is listening on port ${port}");
});
