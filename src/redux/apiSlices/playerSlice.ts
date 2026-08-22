import { api } from "../api/baseApi";

const playerSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getPlayers: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        method: "GET",
        url: `/players/?page=${page}&limit=${limit}`,
      }),
      transformResponse: (response: any) => response,
    }),
    getPlayerById: builder.query({
      query: (id: string) => ({
        method: "GET",
        url: `/players/single/${id}`,
      }),
      transformResponse: (response: any) => response,
    }),
  }),
});

export const { useGetPlayersQuery, useGetPlayerByIdQuery } = playerSlice;
