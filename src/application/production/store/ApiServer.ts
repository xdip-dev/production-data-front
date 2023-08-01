import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Operator } from "../domain/Operator";
import { Model } from "../domain/Model";
import { CreateActionDto } from "../adapters/dtos/CreateActionDto";
import { GetActionResponseModel } from "../adapters/response/GetActionResponseModel";
// import { ResponseModelMapper } from "../adapters/response/ResponseModelMapper";
import { DataTable } from "../domain/DataTable";
import { GetLastActionDto } from "../adapters/dtos/GetLastActionDto";
import { ServerError } from "../domain/errors/ServerError";
import { EndActionDto } from "../adapters/dtos/EndActionDto";
import { CancelActionDto } from "../adapters/dtos/cancelActionDto";

export type CustomTypeError = {
  data :ServerError
}

export const serverApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8080" })as BaseQueryFn<string | FetchArgs, unknown, CustomTypeError>,
  tagTypes: ["Action"],
  endpoints: (builder) => ({
    getAllOperators: builder.query<Operator[], void>({
      query: () => "/get-operators",
    }),
    getAllModels: builder.query<Model[], void>({
      query: () => "/get-models",
    }),
    getAction: builder.query<DataTable, GetLastActionDto>({
      query: (props) => ({
        url:'/get-last-action',
        method:'POST',
        body:props
      }),
      transformResponse: (response: GetActionResponseModel) => {
        //TODO :To change with the Mapper
        return {  
          actionId: response.actionId,
          model: response.model,
          action: response.action,
          status: response.status,}
      },
      providesTags:["Action"]
    }),
    createAction: builder.mutation<string,CreateActionDto>({
      query: (props) => ({
        url:'/create',
        method:'POST',
        body:props
      }),
      invalidatesTags:["Action"]
    }),
    endAction: builder.mutation<string,EndActionDto>({
      query: (props) => ({
        url:'/end-action',
        method:'POST',
        body:props
      }),
      invalidatesTags:["Action"]
    }),
    cancelAction: builder.mutation<string,CancelActionDto>({
      query: (props) => ({
        url:'/cancel',
        method:'POST',
        body:props
      }),
      invalidatesTags:["Action"]
    }),
  }),
});
