import { api } from "../api/baseApi";

const playerSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getPlayers: builder.query({
      query: ({ page = 1, limit = 10, squadId }: { page?: number; limit?: number; squadId?: string }) => {
        let url = `/players/?page=${page}&limit=${limit}`;
        if (squadId) url += `&squadId=${squadId}`;
        return {
          method: "GET",
          url,
        };
      },
      transformResponse: (response: any) => response,
    }),
    getPlayerById: builder.query({
      query: (id: string) => ({
        method: "GET",
        url: `/players/single/${id}`,
      }),
      transformResponse: (response: any) => response,
    }),
    getPlayersBySquad: builder.query({
      query: (squadId: string) => ({
        method: "GET",
        url: `/players/squad/${squadId}`,
      }),
      transformResponse: (response: any) => response?.data,
    }),
  }),
});

export const { useGetPlayersQuery, useGetPlayerByIdQuery, useGetPlayersBySquadQuery } = playerSlice;
