import { Navigate, useLocation } from "react-router-dom";

import { selectAuth, selectUser } from "@features/auth/store/authSlice";
import Loader from "@features/ui/Loader";
import { useAppSelector } from "@store/index";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const auth = useAppSelector(selectAuth);
  const user = useAppSelector(selectUser);
  const location = useLocation();

  if (auth.status === "loading" || auth.status === "idle") {
    return <Loader />;
  }

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
