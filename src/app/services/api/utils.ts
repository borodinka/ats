import { auth } from "@services/firebase";

export function authenticate<T>(authenticatedFn: () => Promise<T>) {
  if (!auth.currentUser) {
    throw Error(
      "You need to be logged in to perform this action. Please log in or create an account to continue",
    );
  }

  return authenticatedFn();
}
