import { api } from "../api/baseApi";

const dashboardSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    generalStats: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/dashboard/general-stat",
        };
      },
    }),
    adminKpiCards: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/dashboard/admin/kpi-cards",
        };
      },
      transformResponse: (response: any) => response.data,
    }),
    adminMonthlyAttendance: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/dashboard/admin/monthly-attendance",
        };
      },
      transformResponse: (response: any) => response.data,
    }),
    adminAgeDistribution: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/dashboard/admin/age-distribution",
        };
      },
      transformResponse: (response: any) => response.data,
    }),
    overAllState: builder.query({
      query: ({ range }) => {
        return {
          method: "GET",
          url: `/dashboard/overall-stat?range=${range}`,
        };
      },
    }),

    bestServices: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/dashboard/best-services",
        };
      },
    }),

    vendorsConversionData: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/dashboard/vendor-order-conversion-rate",
        };
      },
    }),
    adminAttendanceOverview: builder.query({
      query: (filter: string = "today") => ({
        method: "GET",
        url: `/attendance/admin-overview?filter=${filter}`,
      }),
      transformResponse: (response: any) => response?.data,
    }),
    adminAssessmentPlayers: builder.query({
      query: () => ({
        method: "GET",
        url: `/assessment/admin-players`,
      }),
      transformResponse: (response: any) => response?.data,
    }),
    adminPlayerAssessment: builder.query({
      query: (playerId: string) => ({
        method: "GET",
        url: `/assessment/admin-player-assessment/${playerId}`,
      }),
      transformResponse: (response: any) => response?.data,
    }),
    adminPlayerAssessmentHistory: builder.query({
      query: (playerId: string) => ({
        method: "GET",
        url: `/assessment/admin-player-history/${playerId}`,
      }),
      transformResponse: (response: any) => response?.data,
    }),
    adminTargetOverview: builder.query({
      query: (status: string = "All") => ({
        method: "GET",
        url: status !== "All" ? `/targets/admin-overview?status=${status}` : `/targets/admin-overview`,
      }),
      transformResponse: (response: any) => response?.data,
    }),
    adminTargetCard: builder.query({
      query: () => ({
        method: "GET",
        url: `/targets/admin-target-card`,
      }),
      transformResponse: (response: any) => response?.data,
    }),
    adminSessionNotes: builder.query({
      query: () => ({
        method: "GET",
        url: `/session-notes/admin-notes`,
      }),
      transformResponse: (response: any) => response?.data,
    }),
    adminAchievementsSummary: builder.query({
      query: () => ({
        method: "GET",
        url: `/achievements/admin-achievements/summary`,
      }),
      transformResponse: (response: any) => response?.data,
    }),
    adminAchievements: builder.query({
      query: (type: string = "All") => ({
        method: "GET",
        url: type !== "All" ? `/achievements/admin-achievements?type=${type}` : `/achievements/admin-achievements`,
      }),
      transformResponse: (response: any) => response?.data,
    }),
    getAllAgeGroups: builder.query({
      query: () => ({
        method: "GET",
        url: `/age-group`,
      }),
      transformResponse: (response: any) => response?.data,
      providesTags: ['AgeGroups'],
    }),
    createAgeGroup: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `/age-group/create`,
        body: data,
      }),
      invalidatesTags: ['AgeGroups'],
    }),
    updateAgeGroup: builder.mutation({
      query: ({ id, ...data }) => ({
        method: "PATCH",
        url: `/age-group/${id}`,
        body: data,
      }),
      invalidatesTags: ['AgeGroups'],
    }),
    deleteAgeGroup: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/age-group/${id}`,
      }),
      invalidatesTags: ['AgeGroups'],
    }),
    getAllBanners: builder.query({
      query: () => ({
        method: "GET",
        url: `/banners`,
      }),
      transformResponse: (response: any) => response?.data,
      providesTags: ['Banners'],
    }),
    createBanner: builder.mutation({
      query: (formData) => ({
        method: "POST",
        url: `/banners`,
        body: formData,
      }),
      invalidatesTags: ['Banners'],
    }),
    updateBanner: builder.mutation({
      query: ({ id, formData }) => ({
        method: "PATCH",
        url: `/banners/${id}`,
        body: formData,
      }),
      invalidatesTags: ['Banners'],
    }),
    coachKpiCards: builder.query({
      query: () => ({
        method: "GET",
        url: `/dashboard/coach/kpi-cards`,
      }),
      transformResponse: (response: any) => response?.data,
    }),
    coachAttendanceTrend: builder.query({
      query: () => ({
        method: "GET",
        url: `/dashboard/coach/attendance-trend`,
      }),
      transformResponse: (response: any) => response?.data,
    }),
    coachSquadDevelopment: builder.query({
      query: () => ({
        method: "GET",
        url: `/dashboard/coach/squad-development`,
      }),
      transformResponse: (response: any) => response?.data,
    }),
    coachGoalContributions: builder.query({
      query: () => ({
        method: "GET",
        url: `/dashboard/coach/goal-contributions`,
      }),
      transformResponse: (response: any) => response?.data,
    }),
    submitAttendance: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `/attendance/submit-register`,
        body: data,
      }),
    }),
    getSquadAttendanceRegister: builder.query({
      query: ({ squadId, date }) => ({
        method: "GET",
        url: `/attendance/squad-register/${squadId}?date=${date}`,
      }),
      transformResponse: (response: any) => response?.data,
    }),
    getCoachPlayerLatestAssessment: builder.query({
      query: (playerId: string) => ({
        method: "GET",
        url: `/assessment/coach-player-latest/${playerId}`,
      }),
      transformResponse: (response: any) => response?.data,
    }),
    saveAssessment: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `/assessment/save`,
        body: data,
      }),
    }),
    getCoachTargets: builder.query({
      query: ({ page = 1, limit = 100 }) => ({
        method: "GET",
        url: `/targets/coach-targets?page=${page}&limit=${limit}`,
      }),
      transformResponse: (response: any) => response?.data,
    }),
    createTarget: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `/targets/create`,
        body: data,
      }),
    }),
    updateTargetProgress: builder.mutation({
      query: ({ id, ...data }) => ({
        method: "PATCH",
        url: `/targets/update-progress/${id}`,
        body: data,
      }),
    }),
    getCoachSessionNotes: builder.query({
      query: () => ({
        method: "GET",
        url: `/session-notes/coach-notes`,
      }),
      transformResponse: (response: any) => response?.data,
    }),
    createCoachSessionNote: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `/session-notes/create`,
        body: data,
      }),
    }),
    updateCoachSessionNote: builder.mutation({
      query: ({ id, ...data }) => ({
        method: "PATCH",
        url: `/session-notes/update/${id}`,
        body: data,
      }),
    }),
    getCoachAchievements: builder.query({
      query: () => ({
        method: "GET",
        url: `/achievements/coach-achievements`,
      }),
      transformResponse: (response: any) => response?.data,
    }),
    getCoachAchievementsSummary: builder.query({
      query: () => ({
        method: "GET",
        url: `/achievements/coach-achievements/summary`,
      }),
      transformResponse: (response: any) => response?.data,
    }),
    createCoachAchievement: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `/achievements/create`,
        body: data,
      }),
    }),
  }),
});

export const {
  useGeneralStatsQuery,
  useOverAllStateQuery,
  useBestServicesQuery,
  useVendorsConversionDataQuery,
  useAdminKpiCardsQuery,
  useAdminMonthlyAttendanceQuery,
  useAdminAgeDistributionQuery,
  useAdminAttendanceOverviewQuery,
  useAdminAssessmentPlayersQuery,
  useAdminPlayerAssessmentQuery,
  useAdminPlayerAssessmentHistoryQuery,
  useAdminTargetOverviewQuery,
  useAdminTargetCardQuery,
  useAdminSessionNotesQuery,
  useAdminAchievementsSummaryQuery,
  useAdminAchievementsQuery,
  useGetAllAgeGroupsQuery,
  useCreateAgeGroupMutation,
  useUpdateAgeGroupMutation,
  useDeleteAgeGroupMutation,
  useGetAllBannersQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useCoachKpiCardsQuery,
  useCoachAttendanceTrendQuery,
  useCoachSquadDevelopmentQuery,
  useCoachGoalContributionsQuery,
  useSubmitAttendanceMutation,
  useGetSquadAttendanceRegisterQuery,
  useGetCoachPlayerLatestAssessmentQuery,
  useSaveAssessmentMutation,
  useGetCoachTargetsQuery,
  useCreateTargetMutation,
  useUpdateTargetProgressMutation,
  useGetCoachSessionNotesQuery,
  useCreateCoachSessionNoteMutation,
  useUpdateCoachSessionNoteMutation,
  useGetCoachAchievementsQuery,
  useGetCoachAchievementsSummaryQuery,
  useCreateCoachAchievementMutation,
} = dashboardSlice;
