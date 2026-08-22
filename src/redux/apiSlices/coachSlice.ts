import { api } from "../api/baseApi";

const coachSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getCoaches: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        method: "GET",
        url: `/coaches/?page=${page}&limit=${limit}`,
      }),
      transformResponse: (response: any) => response,
    }),
  }),
});

export const { useGetCoachesQuery } = coachSlice;
