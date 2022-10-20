import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAIOMeiWSvAvQXd6tGjifJr-9K4CHcIfL4",

  authDomain: "noteballs-354e0.firebaseapp.com",

  projectId: "noteballs-354e0",

  storageBucket: "noteballs-354e0.appspot.com",

  messagingSenderId: "789077205779",

  appId: "1:789077205779:web:3c0a1275bfe3273757f0e6",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
