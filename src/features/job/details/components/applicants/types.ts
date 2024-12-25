import type { Applicant } from "@features/applicant/types";

export interface ResumeExtraction {
  fullName: Applicant["fullName"];
  email: Applicant["email"];
  phone: Applicant["phone"];
  address: Applicant["address"];
  aboutMe: Applicant["aboutMe"];
  education: Applicant["education"];
  yearsOfExperience: Applicant["yearsOfExperience"];
  jobRole: Applicant["jobRole"];
}
