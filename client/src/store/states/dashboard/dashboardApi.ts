import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@config/env.config";
import { Dashboard } from "@interfaces/dashboard.interface";

export const DashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/v1/dashboard` }),
  tagTypes: ["Dashboard"],
  endpoints: (builder) => ({
    getDashboard: builder.query<Dashboard, void>({
      query: () => "",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetDashboardQuery } = DashboardApi;
