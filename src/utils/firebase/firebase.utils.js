import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7Ux8Uu_XpAeoZDshnMH_udAWiu2y2io4",
  authDomain: "crwn-clothing-db-d52ca.firebaseapp.com",
  projectId: "crwn-clothing-db-d52ca",
  storageBucket: "crwn-clothing-db-d52ca.appspot.com",
  messagingSenderId: "395059550312",
  appId: "1:395059550312:web:d804334c74ef00390e83dd",
};

const firebaseapp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  //if users data does not exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (err) {
      console.log("Tere was a error creating the user", err);
    }
  }

  return userDocRef;
};
