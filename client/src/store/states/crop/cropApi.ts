import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Crop, CropCreate } from "../../interfaces/crop.interface";

const BASE_URL = "http://localhost:3000";

export const cropApi = createApi({
  reducerPath: "cropApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/v1/crop` }),
  tagTypes: ["Crop"],
  endpoints: (builder) => ({
    getCrops: builder.query<Crop[], void>({
      query: () => "",
      providesTags: ["Crop"],
    }),
    getCrop: builder.query<Crop[], string>({
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
} = cropApi;
