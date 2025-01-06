import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

import { addEvent, deleteEvent, getEvents, updateEvent } from "@services/api";

import type { Event } from "../types";

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Events"],
  endpoints: (builder) => ({
    getEvents: builder.query<Event[], void>({
      queryFn: async () => {
        const data = await getEvents();
        return { data };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Events" as const, id })),
              { type: "Events", id: "LIST" },
            ]
          : [{ type: "Events", id: "LIST" }],
    }),
    addEvent: builder.mutation<boolean, Event>({
      queryFn: async (data) => {
        await addEvent(data);
        return { data: true };
      },
      invalidatesTags: () => [{ type: "Events", id: "LIST" }],
    }),
    updateEvent: builder.mutation<
      boolean,
      { id: string; data: Partial<Event> }
    >({
      queryFn: async (data) => {
        await updateEvent(data.id, data.data);
        return { data: true };
      },
      invalidatesTags: (_, __, { id }) => [{ type: "Events", id }],
    }),
    deleteEvent: builder.mutation<boolean, string>({
      queryFn: async (eventId) => {
        await deleteEvent(eventId);
        return { data: true };
      },
      invalidatesTags: (_, __, id) => [
        { type: "Events", id },
        { type: "Events", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useAddEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventsApi;
