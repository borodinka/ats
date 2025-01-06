import type { Applicant } from "@features/applicant/types";

export interface ExtendedProps {
  applicantEmail: Applicant["email"];
  jobRole: Applicant["jobRole"];
  interviewDate: Date | null | string;
  applicantId?: Applicant["id"];
  stages?: Applicant["stages"];
  currentStage?: Applicant["currentStage"];
}

export interface EventDetails {
  title: string;
  start?: string;
  end?: string;
  time?: string;
  extendedProps: ExtendedProps;
}

export interface Event extends EventDetails {
  id: string;
  backgroundColor: string;
}
