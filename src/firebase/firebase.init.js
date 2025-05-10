// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUN6cdA_TvgxGOT4ghZ4N_U-msdnC_wVg",
  authDomain: "disaster-management-webs-4958b.firebaseapp.com",
  projectId: "disaster-management-webs-4958b",
  storageBucket: "disaster-management-webs-4958b.firebasestorage.app",
  messagingSenderId: "296990469932",
  appId: "1:296990469932:web:2bac7a7cd864d1c7c84689"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);