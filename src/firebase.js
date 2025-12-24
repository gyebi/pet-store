// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaTkymcp7S0arkdjLIZs9FUc1h2m3ukwQ",
  authDomain: "pet-adoption-88716.firebaseapp.com",
  projectId: "pet-adoption-88716",
  storageBucket: "pet-adoption-88716.firebasestorage.app",
  messagingSenderId: "968463809680",
  appId: "1:968463809680:web:d61712afabc620cf0fec15"
 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const auth = getAuth(app);



