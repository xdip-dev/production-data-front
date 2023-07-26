import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Operator } from "../application/production/domain/Operator";
import { Model } from "../application/production/domain/Model";

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
  }),
});
