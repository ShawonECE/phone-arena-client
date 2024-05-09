import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDP-Bt8HUIMlURA5CCEMj4JKEq2BpBTss0",
  authDomain: "phone-arena-b3591.firebaseapp.com",
  projectId: "phone-arena-b3591",
  storageBucket: "phone-arena-b3591.appspot.com",
  messagingSenderId: "179093692351",
  appId: "1:179093692351:web:5963904d370d3f25c48b0a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;