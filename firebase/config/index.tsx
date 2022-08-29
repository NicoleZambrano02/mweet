import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDf9vBDbbrUkTVJ40LdAcIJp9-MxavSXJU",
  authDomain: "mweeter-47639.firebaseapp.com",
  projectId: "mweeter-47639",
  storageBucket: "mweeter-47639.appspot.com",
  messagingSenderId: "1098727936342",
  appId: "1:1098727936342:web:6cf23a2348ff1f34e386f7",
  measurementId: "G-6DJ70FB6EQ",
};

const app = initializeApp(firebaseConfig);

const authentication = getAuth();
const db = getFirestore(app);

export { authentication, db };
