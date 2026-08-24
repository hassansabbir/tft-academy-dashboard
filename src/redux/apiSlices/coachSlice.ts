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
    getCoachById: builder.query({
      query: (id: string) => ({
        method: "GET",
        url: `/coaches/single/${id}`,
      }),
      transformResponse: (response: any) => response?.data,
    }),
    createCoach: builder.mutation({
      query: (formData) => ({
        method: "POST",
        url: `/coaches/create`,
        body: formData,
      }),
    }),
  }),
});

export const { useGetCoachesQuery, useGetCoachByIdQuery, useCreateCoachMutation } = coachSlice;
