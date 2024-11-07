import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

import { firebaseConfig } from "@/config/firebase";

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const db = collection(firestore, "matches");

export { db, firestore };
