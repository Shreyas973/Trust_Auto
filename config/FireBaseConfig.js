// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "shre-737ea.firebaseapp.com",
  projectId: "shre-737ea",
  storageBucket: "shre-737ea.appspot.com",
  messagingSenderId: "695019808692",
  appId: "1:695019808692:web:542e87c7894042cfc374e1",
  measurementId: "G-ZG22Q09MSV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export  const storage=getStorage(app);
//const analytics = getAnalytics(app);