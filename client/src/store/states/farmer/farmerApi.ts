import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Farmer,
  FarmerCreate,
  FarmerUpdate,
} from "@interfaces/farmer.interface";
import { BASE_URL } from "@config/env.config";

export const FarmerApi = createApi({
  reducerPath: "FarmerApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/v1/farmer` }),
  tagTypes: ["Farmer"],
  endpoints: (builder) => ({
    getFarmers: builder.query<Farmer[], void>({
      query: () => "",
      providesTags: ["Farmer"],
    }),
    getFarmer: builder.query<Farmer, string>({
      query: (id: string) => `/${id}`,
      providesTags: ["Farmer"],
    }),
    addFarmer: builder.mutation<Farmer, FarmerCreate>({
      query: (farmer) => ({
        url: "/",
        method: "POST",
        body: farmer,
      }),
      invalidatesTags: ["Farmer"],
    }),
    updateFarmer: builder.mutation<Farmer, FarmerUpdate>({
      query: (farmer) => ({
        url: `${farmer.id}`,
        method: "PUT",
        body: farmer,
      }),
    }),
    deleteFarmer: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Farmer"],
    }),
  }),
});

export const {
  useGetFarmersQuery,
  useAddFarmerMutation,
  useUpdateFarmerMutation,
  useDeleteFarmerMutation,
  useGetFarmerQuery,
} = FarmerApi;
