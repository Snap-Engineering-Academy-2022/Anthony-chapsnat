// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDACA3X7F-KoVw2sV3un3AinhkGTMw6_7w",
  authDomain: "chapsnat-1a8bb.firebaseapp.com",
  projectId: "chapsnat-1a8bb",
  storageBucket: "chapsnat-1a8bb.appspot.com",
  messagingSenderId: "922994491526",
  appId: "1:922994491526:web:7e415d7afcee347fdf9107"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
