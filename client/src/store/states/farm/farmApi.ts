import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Farm,
  FarmCreate,
  FarmsResponse,
  FarmUpdate,
} from "@interfaces/farm.interface";
import { BASE_URL } from "@config/env.config";

export const FarmApi = createApi({
  reducerPath: "farmApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/v1/farm` }),
  tagTypes: ["Farm"],
  endpoints: (builder) => ({
    getFarms: builder.query<FarmsResponse, number>({
      query: (page: number) => `?page=${page}&limit=${5}`,
      providesTags: ["Farm"],
    }),
    getFarm: builder.query<Farm, string>({
      query: (id: string) => `/${id}`,
      providesTags: ["Farm"],
    }),
    addFarm: builder.mutation<Farm, FarmCreate>({
      query: (farm) => ({
        url: `/`,
        method: "POST",
        body: farm,
      }),
      invalidatesTags: ["Farm"],
    }),
    updateFarm: builder.mutation<Farm, FarmUpdate>({
      query: (farm) => ({
        url: `/${farm.id}`,
        method: "PUT",
        body: farm,
      }),
      invalidatesTags: ["Farm"],
    }),
    deleteFarm: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Farm"],
    }),
  }),
});

export const {
  useGetFarmsQuery,
  useGetFarmQuery,
  useAddFarmMutation,
  useDeleteFarmMutation,
  useUpdateFarmMutation,
} = FarmApi;
