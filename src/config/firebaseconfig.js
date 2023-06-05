import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJv9VRc54wYEE5OiqGTYmUvgVlmT4dE7U",
  authDomain: "chat-47ba6.firebaseapp.com",
  projectId: "chat-47ba6",
  storageBucket: "chat-47ba6.appspot.com",
  messagingSenderId: "466860895053",
  appId: "1:466860895053:web:7177ee975c8b5a6ee86504",
  measurementId: "G-Z2LQCZ8TF1"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);
export const db      = getFirestore(app);