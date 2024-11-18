import { Route, Routes } from "react-router-dom";

import AuthLayout from "@features/ui/layout/AuthLayout";
import AccountLayout from "@features/ui/layout/accountLayout/AccountLayout";
import AddJob from "@pages/account/add-job";
import Applicants from "@pages/account/applicants";
import Dashboard from "@pages/account/dashboard";
import Jobs from "@pages/account/jobs";
import Schedule from "@pages/account/schedule";
import Home from "@pages/home";
import Login from "@pages/login";
import NotFound from "@pages/not-found";
import SignUp from "@pages/sign-up";

import { AppRoutes } from "./AppRoutes";

export default function AppRouter() {
  return (
    <Routes>
      {/* Public */}
      <Route path={AppRoutes.home} element={<Home />} />
      <Route element={<AuthLayout />}>
        <Route path={AppRoutes.signUp} element={<SignUp />} />
        <Route path={AppRoutes.login} element={<Login />} />
      </Route>
      {/* Account */}
      <Route element={<AccountLayout />}>
        <Route path={AppRoutes.dashboard} element={<Dashboard />} />
        <Route path={AppRoutes.applicants} element={<Applicants />} />
        <Route path={AppRoutes.jobs} element={<Jobs />} />
        <Route path={AppRoutes.schedule} element={<Schedule />} />
        <Route path={AppRoutes.addJob} element={<AddJob />} />
      </Route>
      {/* Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
