import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDWR3YJaqEcR1OxgmfkUcGc9o_6__EcEvQ",
  authDomain: "cmg-dashboard-23e38.firebaseapp.com",
  projectId: "cmg-dashboard-23e38",
  storageBucket: "cmg-dashboard-23e38.firebasestorage.app",
  messagingSenderId: "290291531784",
  appId: "1:290291531784:web:3e324c4e83a18d455251bd",
  measurementId: "G-B2QY58Z5HW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
export default app;
