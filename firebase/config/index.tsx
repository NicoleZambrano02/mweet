import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9ZnvLhxmPgytmsEID_u_ibqTAq6pawAs",
  authDomain: "mweeter-c926f.firebaseapp.com",
  projectId: "mweeter-c926f",
  storageBucket: "mweeter-c926f.appspot.com",
  messagingSenderId: "705243851431",
  appId: "1:705243851431:web:2b9d12b75ac0e382d3c982",
  measurementId: "G-ZPVBC7KDL9",
};

const app = initializeApp(firebaseConfig);

const authentication = getAuth();
const db = getFirestore(app);

export { authentication, db };
