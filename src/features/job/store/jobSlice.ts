import { v4 as uuidv4 } from "uuid";

import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { RootState } from "@store/index";

import type { Job } from "../types";

interface JobState {
  job: Job;
  currentStep: number;
}

const initialState: JobState = {
  job: {
    id: uuidv4(),
    title: "",
    employmentTypes: [],
    categories: [],
    salary: [35000, 80000],
    requiredSkills: [],
    description: "",
    responsibilities: "",
    qualifications: "",
    niceToHaves: "",
    perksBenefits: [],
    numberOfStages: 0,
    stages: [],
    capacity: 0,
  },
  currentStep: 0,
};

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    previousStep: (state) => {
      if (state.currentStep === 0) {
        throw new Error(
          "You are already at the first step. Unable to navigate further back",
        );
      }
      state.currentStep -= 1;
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    setJobInfo: (
      state,
      action: PayloadAction<
        Pick<
          Job,
          | "title"
          | "employmentTypes"
          | "salary"
          | "categories"
          | "requiredSkills"
        >
      >,
    ) => {
      state.job.title = action.payload.title;
      state.job.employmentTypes = action.payload.employmentTypes;
      state.job.salary = action.payload.salary;
      state.job.categories = action.payload.categories;
      state.job.requiredSkills = action.payload.requiredSkills;
    },
    setJobDescription: (
      state,
      action: PayloadAction<
        Pick<
          Job,
          "description" | "responsibilities" | "qualifications" | "niceToHaves"
        >
      >,
    ) => {
      state.job.description = action.payload.description;
      state.job.responsibilities = action.payload.responsibilities;
      state.job.qualifications = action.payload.qualifications;
      state.job.niceToHaves = action.payload.niceToHaves;
    },
    setBenefits: (state, action: PayloadAction<Pick<Job, "perksBenefits">>) => {
      state.job.perksBenefits = action.payload.perksBenefits;
    },
    setRecruitmentStages: (
      state,
      action: PayloadAction<
        Pick<Job, "numberOfStages" | "stages" | "capacity">
      >,
    ) => {
      state.job.numberOfStages = action.payload.numberOfStages;
      state.job.stages = action.payload.stages;
      state.job.capacity = action.payload.capacity;
    },
  },
});

export const {
  previousStep,
  nextStep,
  setJobInfo,
  setJobDescription,
  setBenefits,
  setRecruitmentStages,
} = jobSlice.actions;

export const selectCurrentStep = (state: RootState) => state.job.currentStep;
export const selectJob = (state: RootState) => state.job.job;

export default jobSlice.reducer;
