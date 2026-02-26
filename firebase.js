import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBZWz5_7uClc6rCTh9_9ZBK5DhgkPcazUs",
  authDomain: "heartbeatapp-c811c.firebaseapp.com",
  projectId: "heartbeatapp-c811c",
  storageBucket: "heartbeatapp-c811c.firebasestorage.app",
  messagingSenderId: "415940987331",
  appId: "1:415940987331:web:c0b1cd8fdf7ac738bbd576"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);