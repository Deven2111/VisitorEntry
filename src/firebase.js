// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔑 replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDq5EEkiAmNk5m1g-cOCq7qm0bQxEW7OYg",
  authDomain: "visitor-entry-form-7c1be.firebaseapp.com",
  projectId: "visitor-entry-form-7c1be",
  storageBucket: "visitor-entry-form-7c1be.firebasestorage.app",
  messagingSenderId: "826884011574",
  appId: "1:826884011574:web:0b83d466a4a10d8f5bca97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);