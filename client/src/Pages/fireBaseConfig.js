// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, FacebookAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDNa8y2VpU2o4gBZx3noDiQcEILQRepcbI",
  authDomain: "subdefy-996f7.firebaseapp.com",
  projectId: "subdefy-996f7",
  storageBucket: "subdefy-996f7.appspot.com",
  messagingSenderId: "378456776538",
  appId: "1:378456776538:web:15957ad75a5fdf700a5d63",
  measurementId: "G-3RDZXKDB7Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new FacebookAuthProvider();
export { auth, provider };
