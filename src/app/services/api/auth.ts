import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth, mapAuthCodeToMessage } from "@services/firebase";

export function login(email: string, password: string) {
  return handleAuthError(async () => {
    await signInWithEmailAndPassword(auth, email, password);
  });
}

export function register(full_name: string, email: string, password: string) {
  return handleAuthError(async () => {
    await createUserWithEmailAndPassword(auth, email, password);
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: full_name });
    } else {
      throw Error("Oops! Something went wrong");
    }
  });
}

async function handleAuthError(authFunction: () => Promise<void>) {
  try {
    await authFunction();
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw Error(mapAuthCodeToMessage(error.code));
    }
    throw Error("Oops! Something went wrong");
  }
}
