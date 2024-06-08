import type { IUser, IUserAuth } from "./../types/user";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import router from "@/router/index";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "question-f1640.firebaseapp.com",
  projectId: "question-f1640",
  storageBucket: "question-f1640.appspot.com",
  messagingSenderId: "612331778407",
  appId: "1:612331778407:web:d083a0b610727e19387fc2",
};

firebase.initializeApp(firebaseConfig);

// Google Authentication
const googleProvider = new firebase.auth.GoogleAuthProvider();

const helperAuth = (data: any) => {
  const saveUserData: IUserAuth = {
    displayName: data.user._delegate.displayName,
    email: data.user._delegate.email,
    photoUrl: data.user._delegate.photoURL,
    stsTokenManager: data.user._delegate.stsTokenManager,
  };

  return saveUserData;
};

export const signInWithGoogle = async () => {
  try {
    const result = await firebase.auth().signInWithPopup(googleProvider);

    return helperAuth(result);
  } catch (error) {
    throw error;
  }
};

// Facebook Authentication
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export const signInWithFacebook = async () => {
  try {
    const result = await firebase.auth().signInWithPopup(facebookProvider);

    return helperAuth(result);
  } catch (error) {
    throw error;
  }
};
