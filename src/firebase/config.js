import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: "AIzaSyCXmy3qR4W4izOCRNg5wpKxfj27mQpD4d4",
  authDomain: "journal-app-79e47.firebaseapp.com",
  projectId: "journal-app-79e47",
  storageBucket: "journal-app-79e47.appspot.com",
  messagingSenderId: "14145213314",
  appId: "1:14145213314:web:db98f2d8347106b995759b"
}

// Initialize Firebase
export const FirebaseApp = initializeApp( firebaseConfig )
export const FirebaseAuth = getAuth( FirebaseApp )
export const FirebaseDB = getFirestore( FirebaseApp )