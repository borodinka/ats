import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

import { getJobById, getJobs } from "@services/api";

import type { Job } from "../types";

export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getJobs: builder.query<Job[], void>({
      queryFn: async () => {
        const data = await getJobs();
        return { data };
      },
    }),
    getJobById: builder.query<Job, string | undefined>({
      queryFn: async (jobId) => {
        const data = await getJobById(jobId);
        return { data };
      },
    }),
  }),
});

export const { useGetJobsQuery, useGetJobByIdQuery } = jobsApi;
