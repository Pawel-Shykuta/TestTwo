import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBqa_VQ2cwrO_UV0A5JNKxscR1dEeOSyTA",
    authDomain: "users-279b7.firebaseapp.com",
    databaseURL: "https://users-279b7-default-rtdb.firebaseio.com",
    projectId: "users-279b7",
    storageBucket: "users-279b7.firebasestorage.app",
    messagingSenderId: "294588573154",
    appId: "1:294588573154:web:dfce3c599451e36c3205bb",
    measurementId: "G-46JE472FV0"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 

export { db };
