import { type Job, type RecruitmentStage } from "@features/job/types";

export interface ResumeFile {
  fileName: string;
  storagePath?: string;
  url?: string;
}

export interface FileUpload extends ResumeFile {
  file?: File;
}

export interface StageWithFeedback extends RecruitmentStage {
  feedback: string;
}

export type Status = "Interview" | "Hired" | "Declined";

export interface Applicant {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address?: string | null;
  aboutMe: string;
  education: string;
  yearsOfExperience?: number;
  jobRole: string;
  resume: ResumeFile;
  jobId?: Job["id"] | null;
  stages: StageWithFeedback[];
  currentStage: StageWithFeedback | null;
  score: number;
  status: Status;
  declineReason: string | null;
}
