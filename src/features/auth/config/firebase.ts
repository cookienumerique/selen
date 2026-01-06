// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDr7jRYKmtTeM6Way1SuX2eOrU6TnXE1_8",
  authDomain: "selen-app-officiel-c652b.firebaseapp.com",
  projectId: "selen-app-officiel-c652b",
  storageBucket: "selen-app-officiel-c652b.firebasestorage.app",
  messagingSenderId: "405749262108",
  appId: "1:405749262108:web:599e063f2944a26d0f7cd9",
  measurementId: "G-FZDTL04FEF",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
