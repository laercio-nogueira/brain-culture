import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Harvest,
  HarvestCreate,
  HarvestUpdate,
} from "@interfaces/harvest.interface";
import { BASE_URL } from "@config/env.config";

export const HarvestApi = createApi({
  reducerPath: "HarvestApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/v1/harvest` }),
  tagTypes: ["Harvest"],
  endpoints: (builder) => ({
    getHarvests: builder.query<Harvest[], void>({
      query: () => "",
      providesTags: ["Harvest"],
    }),
    getHarvest: builder.query<Harvest, string>({
      query: (id: string) => `/${id}`,
      providesTags: ["Harvest"],
    }),
    addHarvest: builder.mutation<Harvest, HarvestCreate>({
      query: (harvest) => ({
        url: "",
        method: "POST",
        body: harvest,
      }),
      invalidatesTags: ["Harvest"],
    }),
    updateHarvest: builder.mutation<Harvest, HarvestUpdate>({
      query: (harvest: HarvestUpdate) => ({
        url: `/${harvest.id}`,
        method: "PUT",
        body: harvest,
      }),
      invalidatesTags: ["Harvest"],
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

export const {
  useGetHarvestsQuery,
  useDeleteHarvestMutation,
  useAddHarvestMutation,
  useUpdateHarvestMutation,
  useGetHarvestQuery,
} = HarvestApi;
