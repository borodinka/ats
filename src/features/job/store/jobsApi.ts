import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  addJob,
  deleteJob,
  getJobById,
  getJobs,
  updateJob,
} from "@services/api";

import type { Job } from "../types";

export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Jobs"],
  endpoints: (builder) => ({
    getJobs: builder.query<Job[], void>({
      queryFn: async () => {
        const data = await getJobs();
        return { data };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Jobs" as const, id })),
              { type: "Jobs", id: "LIST" },
            ]
          : [{ type: "Jobs", id: "LIST" }],
    }),
    getJobById: builder.query<Job, string | undefined>({
      queryFn: async (jobId) => {
        const data = await getJobById(jobId);
        return { data };
      },
      providesTags: (_, __, id) => [{ type: "Jobs", id }],
    }),
    updateJob: builder.mutation<boolean, { id: string; data: Partial<Job> }>({
      queryFn: async (data) => {
        await updateJob(data.id, data.data);
        return { data: true };
      },
      invalidatesTags: (_, __, { id }) => [{ type: "Jobs", id }],
    }),
    addJob: builder.mutation<boolean, Job>({
      queryFn: async (data) => {
        await addJob(data);
        return { data: true };
      },
      invalidatesTags: () => [{ type: "Jobs", id: "LIST" }],
    }),
    deleteJob: builder.mutation<boolean, string>({
      queryFn: async (jobId) => {
        await deleteJob(jobId);
        return { data: true };
      },
      invalidatesTags: (_, __, id) => [
        { type: "Jobs", id },
        { type: "Jobs", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobByIdQuery,
  useUpdateJobMutation,
  useAddJobMutation,
  useDeleteJobMutation,
} = jobsApi;
