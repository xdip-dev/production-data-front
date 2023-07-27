import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Operator } from "../domain/Operator";
import { Model } from "../domain/Model";
import { CreateActionDto } from "../adapters/dtos/CreateActionDto";

export const serverApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8080" }),
  tagTypes: ["Action"],
  endpoints: (builder) => ({
    getAllOperators: builder.query<Operator[], void>({
      query: () => "/get-operators",
    }),
    getAllModels: builder.query<Model[], void>({
      query: () => "/get-models",
    }),
    getAction: builder.query<Model[], void>({
      query: () => "/get-action",
      providesTags:['Action']
    }),
    createAction: builder.mutation<string,CreateActionDto>({
      query: (action:CreateActionDto) => ({
        url:'/create',
        method:'POST',
        body:action
      }),
      invalidatesTags:['Action']
    }),
  }),
});
