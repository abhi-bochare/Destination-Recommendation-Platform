import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAVZ7vCq7nNi2KDw96VDZWGHfAkO-uYShc",
  authDomain: "destination-recommendati-5f957.firebaseapp.com",
  databaseURL:
    "https://destination-recommendati-5f957-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "destination-recommendati-5f957",
  storageBucket: "destination-recommendati-5f957.firebasestorage.app",
  messagingSenderId: "898379504003",
  appId: "1:898379504003:web:8fb66acc0ebe72c1923eb6",
  measurementId: "G-7Y32YJPTV0",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
export { db };
