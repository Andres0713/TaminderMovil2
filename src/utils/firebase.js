// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHObCG7kuP5bJRtyMasBOA1Ny0hXsuv_w",
  authDomain: "login-expo-react-andres.firebaseapp.com",
  projectId: "login-expo-react-andres",
  storageBucket: "login-expo-react-andres.firebasestorage.app",
  messagingSenderId: "764541606153",
  appId: "1:764541606153:web:b9c4bb74082f5f526fdbd8"
};

// Initialize Firebase. Liga hacia la nube
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);