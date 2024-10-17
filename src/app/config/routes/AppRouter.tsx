import { Route, Routes } from "react-router-dom";

import AuthLayout from "@features/ui/layout/AuthLayout";
import Home from "@pages/home";
import Login from "@pages/login";
import NotFound from "@pages/not-found";
import SignUp from "@pages/sign-up";

import { AppRoutes } from "./AppRoutes";

export default function AppRouter() {
  return (
    <Routes>
      <Route path={AppRoutes.home} element={<Home />} />
      <Route element={<AuthLayout />}>
        <Route path={AppRoutes.signUp} element={<SignUp />} />
        <Route path={AppRoutes.login} element={<Login />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
