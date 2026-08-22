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
  }),
});

export const { useGetSquadsQuery } = squadSlice;
