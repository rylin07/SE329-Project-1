// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6mPDvqf6ATDIes0RVMEMeg21YY6gJz8I",
  authDomain: "se329-project-1-40b4d.firebaseapp.com",
  projectId: "se329-project-1-40b4d",
  storageBucket: "se329-project-1-40b4d.firebasestorage.app",
  messagingSenderId: "182748723718",
  appId: "1:182748723718:web:2c051c0686977c9a4f6187",
  measurementId: "G-5WQ7VCPS4F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;