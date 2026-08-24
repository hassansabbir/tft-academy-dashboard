import { api } from "../api/baseApi";

const squadSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getSquads: builder.query({
      query: () => ({
        method: "GET",
        url: "/squads",
      }),
      transformResponse: (response: any) => response,
    }),
    getCoachSquads: builder.query({
      query: (coachId: string) => ({
        method: "GET",
        url: `/squads/coach-squads/${coachId}`,
      }),
      transformResponse: (response: any) => response?.data,
    }),
    getSquadById: builder.query({
      query: (id: string) => ({
        method: "GET",
        url: `/squads/single/${id}`,
      }),
      transformResponse: (response: any) => response?.data,
    }),
    getMySquads: builder.query({
      query: () => ({
        method: "GET",
        url: "/squads/my-squads",
      }),
      transformResponse: (response: any) => response?.data,
    }),
    createSquad: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/squads/create",
        body: data,
      }),
    }),
  }),
});

export const { useGetSquadsQuery, useGetCoachSquadsQuery, useGetSquadByIdQuery, useGetMySquadsQuery, useCreateSquadMutation } = squadSlice;
