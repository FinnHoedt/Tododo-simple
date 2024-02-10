// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBBJ5FalUJP9yNzPL0zpzc4QwxMkkJge4g",
    authDomain: "tododo-24891.firebaseapp.com",
    projectId: "tododo-24891",
    storageBucket: "tododo-24891.appspot.com",
    messagingSenderId: "729217781944",
    appId: "1:729217781944:web:030f5546a8bfbc919fe44d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
