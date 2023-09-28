// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, User, getAuth, onAuthStateChanged, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "dummyKey",
  authDomain: "ytube-clone-6979e.firebaseapp.com",
  projectId: "ytube-clone-6979e",
  storageBucket: "ytube-clone-6979e.appspot.com",
  messagingSenderId: "dummySenderId",
  appId: "dummyAppId"
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