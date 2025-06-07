import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Farmer } from "../../interfaces/farmer.interface";

const BASE_URL = "http://localhost:3000";

export const FarmerApi = createApi({
  reducerPath: "FarmerApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/v1/farmer` }),
  tagTypes: ["Farmer"],
  endpoints: (builder) => ({
    getFarmers: builder.query<Farmer[], void>({
      query: () => "",
      providesTags: ["Farmer"],
    }),
    addFarmer: builder.mutation<Farmer, Omit<Farmer, "id">>({
      query: (farmer) => ({
        url: "/producers",
        method: "POST",
        body: farmer,
      }),
      invalidatesTags: ["Farmer"],
    }),
    updateFarmer: builder.mutation<Farmer, Farmer>({
      query: (farmer) => ({
        url: `/producers/${farmer.id}`,
        method: "PUT",
        body: farmer,
      }),
      invalidatesTags: ["Farmer"],
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
} = FarmerApi;
