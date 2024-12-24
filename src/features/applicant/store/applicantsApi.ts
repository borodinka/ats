import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  addApplicant,
  deleteApplicant,
  getApplicantById,
  getApplicants,
  getApplicantsByJobId,
  updateApplicant,
} from "@services/api";

import type { Applicant } from "../types";

export const applicantsApi = createApi({
  reducerPath: "applicantsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Applicants"],
  endpoints: (builder) => ({
    getApplicants: builder.query<Applicant[], void>({
      queryFn: async () => {
        const data = await getApplicants();
        return { data };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Applicants" as const, id })),
              { type: "Applicants", id: "LIST" },
            ]
          : [{ type: "Applicants", id: "LIST" }],
    }),
    getApplicantsByJobId: builder.query<Applicant[], string | undefined>({
      queryFn: async (jobId) => {
        const data = await getApplicantsByJobId(jobId);
        return { data };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Applicants" as const, id })),
              { type: "Applicants", id: "LIST" },
            ]
          : [{ type: "Applicants", id: "LIST" }],
    }),
    getApplicantById: builder.query<Applicant, string | undefined>({
      queryFn: async (applicantId) => {
        const data = await getApplicantById(applicantId);
        return { data };
      },
      providesTags: (_, __, id) => [{ type: "Applicants", id }],
    }),
    addApplicant: builder.mutation<boolean, Applicant>({
      queryFn: async (data) => {
        await addApplicant(data);
        return { data: true };
      },
      invalidatesTags: () => [{ type: "Applicants", id: "LIST" }],
    }),
    updateApplicant: builder.mutation<
      boolean,
      { id: string; data: Partial<Applicant> }
    >({
      queryFn: async (data) => {
        await updateApplicant(data.id, data.data);
        return { data: true };
      },
      invalidatesTags: (_, __, { id }) => [{ type: "Applicants", id }],
    }),
    deleteApplicant: builder.mutation<boolean, string>({
      queryFn: async (applicantId) => {
        await deleteApplicant(applicantId);
        return { data: true };
      },
      invalidatesTags: (_, __, id) => [
        { type: "Applicants", id },
        { type: "Applicants", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetApplicantsQuery,
  useGetApplicantsByJobIdQuery,
  useGetApplicantByIdQuery,
  useAddApplicantMutation,
  useDeleteApplicantMutation,
  useUpdateApplicantMutation,
} = applicantsApi;
