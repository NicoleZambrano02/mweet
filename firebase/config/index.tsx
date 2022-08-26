import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBLE7hdaHgUqvCZ11Nc7KSJRBkzvslwbfU",
  authDomain: "mweeter-8934e.firebaseapp.com",
  projectId: "mweeter-8934e",
  storageBucket: "mweeter-8934e.appspot.com",
  messagingSenderId: "930827104285",
  appId: "1:930827104285:web:58252f3ebb5559aa6816f4",
  measurementId: "G-KJ96R59KQL",
};

const app = initializeApp(firebaseConfig);

const authentication = getAuth();
const db = getFirestore(app);

export { authentication, db };
