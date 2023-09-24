// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, User, getAuth, onAuthStateChanged, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsNCqvzJYWHv2ftPL63FT9ePU8r50cL6Q",
  authDomain: "ytube-clone-6979e.firebaseapp.com",
  projectId: "ytube-clone-6979e",
  storageBucket: "ytube-clone-6979e.appspot.com",
  messagingSenderId: "151019558189",
  appId: "1:151019558189:web:fc364550def2e2d1bc6fa4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export function signInWithGoogle() {
    return signInWithPopup(auth, new GoogleAuthProvider())
}

export function signOut() {
    return auth.signOut()
}

export function onAuthStateChangedHelper(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback)
}