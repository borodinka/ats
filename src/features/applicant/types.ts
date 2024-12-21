import { type Job, type RecruitmentStage } from "@features/job/types";

export interface ResumeFile {
  fileName: string;
  storagePath?: string;
  url?: string;
}

export interface FileUpload extends ResumeFile {
  file?: File;
}

export interface Applicant {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  education?: string;
  yearsOfExperience?: number;
  resume: ResumeFile;
  jobId: string;
  recruitmentStages: Job["stages"];
  currentStage: RecruitmentStage;
}
