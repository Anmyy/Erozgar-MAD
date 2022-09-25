import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCNDcxqYffWDbNHFWZpyk58-3Wq8cdPxzI",
  authDomain: "my-first-firebase-projec-1ce79.firebaseapp.com",
  projectId: "my-first-firebase-projec-1ce79",
  storageBucket: "my-first-firebase-projec-1ce79.appspot.com",
  messagingSenderId: "179788087164",
  appId: "1:179788087164:web:850e4c8eb60fb90fe6aef9",
  measurementId: "G-NTVGGL79Z5"
};

// Initialize Firebase
const App = initializeApp(firebaseConfig);

export default App;