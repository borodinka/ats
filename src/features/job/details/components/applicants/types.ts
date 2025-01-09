import type { Applicant } from "@features/applicant/types";

export interface ResumeExtraction {
  fullName: Applicant["fullName"];
  email: Applicant["email"];
  phone: Applicant["phone"];
  address: Applicant["address"] | null;
  aboutMe: Applicant["aboutMe"] | null;
  education: Applicant["education"];
  yearsOfExperience: Applicant["yearsOfExperience"] | null;
  jobRole: Applicant["jobRole"];
}
