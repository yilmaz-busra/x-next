// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "x-clone-2.firebaseapp.com",
  projectId: "x-clone-2",
  storageBucket: "x-clone-2.appspot.com",
  messagingSenderId: "446072138801",
  appId: "1:446072138801:web:a9a06c489be4f9154d7910",
  measurementId: "G-P0T53391G2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
