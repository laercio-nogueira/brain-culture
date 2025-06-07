import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Harvest } from "../../interfaces/harvest.interface";

const BASE_URL = "http://localhost:3000";

export const HarvestApi = createApi({
  reducerPath: "HarvestApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/v1/harvest` }),
  tagTypes: ["Harvest"],
  endpoints: (builder) => ({
    getHarvests: builder.query<Harvest[], void>({
      query: () => "",
      providesTags: ["Harvest"],
    }),
    deleteHarvest: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Harvest"],
    }),
  }),
});

export const { useGetHarvestsQuery, useDeleteHarvestMutation } = HarvestApi;
