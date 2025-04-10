// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPcHd53Ml5kqg_NDl1kM03uoDqueKY26Q",
  authDomain: "whatsapp-clone-250fd.firebaseapp.com",
  projectId: "whatsapp-clone-250fd",
  storageBucket: "whatsapp-clone-250fd.firebasestorage.app",
  messagingSenderId: "673854524498",
  appId: "1:673854524498:web:6565d8940838b28eda238b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage();

export { auth, db, storage };