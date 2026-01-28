// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDr7jRYKmtTeM6Way1SuX2eOrU6TnXE1_8',
  authDomain: 'selen-app-officiel-c652b.firebaseapp.com',
  projectId: 'selen-app-officiel-c652b',
  storageBucket: 'selen-app-officiel-c652b.firebasestorage.app',
  messagingSenderId: '405749262108',
  appId: '1:405749262108:web:599e063f2944a26d0f7cd9',
  measurementId: 'G-FZDTL04FEF',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
