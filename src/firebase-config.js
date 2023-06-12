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
    apiKey: "AIzaSyCMFV6D_z914oX9hE8ENlBuETWx0cfYh30",
    authDomain: "react-todo-fire-test2.firebaseapp.com",
    projectId: "react-todo-fire-test2",
    storageBucket: "react-todo-fire-test2.appspot.com",
    messagingSenderId: "937580876696",
    appId: "1:937580876696:web:2157956abb9322a105d1ed",
    measurementId: "G-ZTWQVWQD7M"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);