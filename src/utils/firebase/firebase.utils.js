import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyDyz5oKlglKOJ4ezeZ5JWUXo-TCbHikYp8",
  authDomain: "ecom-clothing-4a582.firebaseapp.com",
  projectId: "ecom-clothing-4a582",
  storageBucket: "ecom-clothing-4a582.appspot.com",
  messagingSenderId: "51408828096",
  appId: "1:51408828096:web:63b5af8d2a54037ba31f25"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({ 
  prompt: 'select_account' 
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userDocRef;
}