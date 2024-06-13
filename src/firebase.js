// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from "firebase/firestore/lite"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBockYLW8bBUHCbFH-y3yNX1db8QtorpDA",
  authDomain: "react-firebase-2-7c4c4.firebaseapp.com",
  projectId: "react-firebase-2-7c4c4",
  storageBucket: "react-firebase-2-7c4c4.appspot.com",
  messagingSenderId: "762240545547",
  appId: "1:762240545547:web:a3d5c60ac944d8d377680e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
export {auth, db};