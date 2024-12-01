import { useEffect } from "react";

import { logout, userLoaded } from "@features/auth/store/authSlice";
import { auth } from "@services/firebase";
import { useAppDispatch } from "@store/index";

export function useAuthStateSubscription() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          userLoaded({
            uid: user.uid,
            email: user.email ?? "",
            displayName: user.displayName,
          }),
        );
      } else {
        dispatch(logout());
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
