// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFfZ5Mj2pNmOJT7KLI_BZBmGm2TF4jde8",
  authDomain: "pos-8e01b.firebaseapp.com",
  projectId: "pos-8e01b",
  storageBucket: "pos-8e01b.appspot.com",
  messagingSenderId: "375273229393",
  appId: "1:375273229393:web:c27d155754222397867c70"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase