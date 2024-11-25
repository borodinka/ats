import { Route, Routes } from "react-router-dom";

import Applicants from "@features/applicant/pages/applicants";
import Login from "@features/auth/pages/login";
import SignUp from "@features/auth/pages/sign-up";
import Schedule from "@features/calendar/schedule";
import Dashboard from "@features/dashboard/dashboard";
import Home from "@features/home/pages/home";
import NotFound from "@features/home/pages/not-found";
import AddJob from "@features/job/pages/add-job";
import Jobs from "@features/job/pages/jobs";
import AuthLayout from "@features/ui/layout/AuthLayout";
import AccountLayout from "@features/ui/layout/accountLayout/AccountLayout";

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
