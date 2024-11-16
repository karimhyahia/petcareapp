import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC7cBn3k_h22dTkiXTOpiAW5CM0ckhN7kQ",
  authDomain: "petcareapp-75caf.firebaseapp.com",
  projectId: "petcareapp-75caf",
  storageBucket: "petcareapp-75caf.firebasestorage.app",
  messagingSenderId: "1029134531798",
  appId: "1:1029134531798:web:5ae79faf3cccaaff14dd77"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);