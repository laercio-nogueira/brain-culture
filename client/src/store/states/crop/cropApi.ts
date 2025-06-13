import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Crop,
  CropCreate,
  CropsResponse,
  CropUpdate,
} from "@interfaces/crop.interface";
import { BASE_URL } from "@config/env.config";

export const CropApi = createApi({
  reducerPath: "CropApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/v1/crop` }),
  tagTypes: ["Crop"],
  endpoints: (builder) => ({
    getCrops: builder.query<CropsResponse, number>({
      query: (page: number) => `?page=${page}&limit=${5}`,
      providesTags: ["Crop"],
    }),
    getCrop: builder.query<Crop, string>({
      query: (cropId) => `/${cropId}`,
      providesTags: ["Crop"],
    }),
    addCrop: builder.mutation<Crop, CropCreate>({
      query: (formData) => ({
        url: "",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Crop"],
    }),
    updateCrop: builder.mutation<Crop, CropUpdate>({
      query: (crop) => ({
        url: `/${crop.id}`,
        method: "PUT",
        body: crop,
      }),
      invalidatesTags: ["Crop"],
    }),
    deleteCrop: builder.mutation<void, string>({
      query: (cropId) => ({
        url: `/${cropId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Crop"],
    }),
  }),
});

export const {
  useGetCropsQuery,
  useGetCropQuery,
  useDeleteCropMutation,
  useAddCropMutation,
  useUpdateCropMutation,
} = CropApi;
