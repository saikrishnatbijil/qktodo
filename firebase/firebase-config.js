// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "qktodo.firebaseapp.com",
    projectId: "qktodo",
    storageBucket: "qktodo.appspot.com",
    messagingSenderId: "723009771216",
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: "G-JHQX9GB28R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const databse = getDatabase(app);
