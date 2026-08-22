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
} = dashboardSlice;
