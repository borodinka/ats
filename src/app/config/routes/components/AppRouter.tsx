import { Route, Routes } from "react-router-dom";

import ApplicantDetails from "@features/applicant/pages/applicantDetails";
import Applicants from "@features/applicant/pages/applicants";
import Login from "@features/auth/pages/login";
import SignUp from "@features/auth/pages/sign-up";
import Schedule from "@features/calendar/pages/schedule";
import Dashboard from "@features/dashboard/dashboard";
import Home from "@features/home/pages/home";
import NotFound from "@features/home/pages/not-found";
import AddJob from "@features/job/pages/add-job";
import JobDetailsPage from "@features/job/pages/job-details";
import Jobs from "@features/job/pages/jobs";
import AuthLayout from "@features/ui/layout/AuthLayout";
import AccountLayout from "@features/ui/layout/accountLayout/AccountLayout";

import { AppRoutes } from "../AppRoutes";
import ProtectedRoute from "./ProtectedRoute";

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
      <Route
        element={
          <ProtectedRoute>
            <AccountLayout />
          </ProtectedRoute>
        }
      >
        <Route path={AppRoutes.dashboard} element={<Dashboard />} />
        <Route path={AppRoutes.applicants} element={<Applicants />} />
        <Route
          path={`${AppRoutes.applicants}/:applicantId`}
          element={<ApplicantDetails />}
        />
        <Route path={AppRoutes.jobs} element={<Jobs />} />
        <Route path={`${AppRoutes.jobs}/:jobId`} element={<JobDetailsPage />} />
        <Route
          path={`${AppRoutes.jobs}/:jobId/applicants/:applicantId`}
          element={<ApplicantDetails />}
        />
        <Route path={AppRoutes.schedule} element={<Schedule />} />
        <Route path={AppRoutes.addJob} element={<AddJob />} />
      </Route>
      {/* Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
