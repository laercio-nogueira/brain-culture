import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Farm, FarmCreate } from "../../interfaces/farm.interface";

const BASE_URL = "http://localhost:3000";

export const FarmApi = createApi({
  reducerPath: "farmApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/v1/farm` }),
  tagTypes: ["Farm"],
  endpoints: (builder) => ({
    getFarms: builder.query<Farm[], void>({
      query: () => "",
      providesTags: ["Farm"],
    }),
    getFarm: builder.query<Farm, string>({
      query: (producerId) => `/producers/${producerId}/farms`,
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
    updateFarm: builder.mutation<Farm, { producerId: string; farm: Farm }>({
      query: ({ producerId, farm }) => ({
        url: `/producers/${producerId}/farms`,
        method: "POST",
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
} = FarmApi;
