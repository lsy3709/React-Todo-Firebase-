// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBytudMp6P6ZP1MvES_U3OLbBoOC8B1h6Y",
//   authDomain: "react-todo-project-d0317.firebaseapp.com",
//   projectId: "react-todo-project-d0317",
//   storageBucket: "react-todo-project-d0317.appspot.com",
//   messagingSenderId: "277320031127",
//   appId: "1:277320031127:web:5e378b5a34e0c122d302d2",
//   measurementId: "G-ZYM0R7BNSL"
// };

const firebaseConfig = {
  apiKey: "AIzaSyB4Ls21VYK-5WO7pDki9TKmlD27GdxBVfc",
  authDomain: "react-test-fire3.firebaseapp.com",
  projectId: "react-test-fire3",
  storageBucket: "react-test-fire3.appspot.com",
  messagingSenderId: "44897170025",
  appId: "1:44897170025:web:49e84e075559b73c29e8f8",
  measurementId: "G-CDW54L3FT6"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);