import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

export const config = {
  apiKey: 'AIzaSyAeCDzyc2KOoLWKfYf0VaqKXRai0h5CNJo',
  authDomain: 'ecommercetest-b71b2.firebaseapp.com',
  projectId: 'ecommercetest-b71b2',
  storageBucket: 'ecommercetest-b71b2.appspot.com',
  messagingSenderId: '449302682011',
  appId: '1:449302682011:web:660a334a68292ec304693e',
}
export const app = initializeApp(config)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)
export default app
// // Initialize Firebase
// const app = initializeApp(firebaseConfig)
