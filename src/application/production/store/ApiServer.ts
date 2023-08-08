import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Operator } from "../domain/Operator";
import { Model } from "../domain/Model";
import { CreateActionDto } from "../adapters/dtos/CreateActionDto";
import { GetActionResponseModel } from "../adapters/response/GetActionResponseModel";
// import { ResponseModelMapper } from "../adapters/response/ResponseModelMapper";
import { DataTable } from "../domain/DataTable";
import { GetLastActionDto } from "../adapters/dtos/GetLastActionDto";
import { ServerError, ServerErrorMissingField } from "../domain/errors/ServerError";
import { EndActionDto } from "../adapters/dtos/EndActionDto";
import { CancelActionDto } from "../adapters/dtos/CancelActionDto";
import { GetAllOperatorsResponseModel } from "../adapters/response/GetAllOperatorsResponseModel";
import { ResponseModelMapper } from "../adapters/response/ResponseModelMapper";
import { AddAllActionsDto } from "../adapters/dtos/AllActions/AddAllActionsDto";
import { GenerateBarcodePdfDto } from "../adapters/dtos/Pdf/GenerateBarcodePdfDto";

export type CustomTypeError = {
  data :ServerError | ServerErrorMissingField
}

export const serverApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8080" })as BaseQueryFn<string | FetchArgs, unknown, CustomTypeError>,
  tagTypes: ["Action","AllActionList"],
  endpoints: (builder) => ({
    getAllOperators: builder.query<Operator[], void>({
      query: () => "/get-operators",
      transformResponse: (response: GetAllOperatorsResponseModel[]) => {
        return response.map((operator) => 
          ResponseModelMapper.getAllOperatorsMapper(operator)
        );
      }
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
        return ResponseModelMapper.getActionMapper(response);
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
    getAllActions: builder.query<string[],void>({
      query: () => "/get-all-actions",
      providesTags:["AllActionList"]
    }),
    addAllActions: builder.mutation<void,AddAllActionsDto>({
      query: (props) => ({
        url:'/add-all-actions',
        method:'POST',
        body:props
      }),
      invalidatesTags:["AllActionList"]
    }),
    generateBarcodePdf: builder.mutation<string,GenerateBarcodePdfDto>({
      query: (props) => ({
        url:'/generate-pdf-barcode',
        method:'POST',
        body:props,
        responseHandler: (response) => response.blob().then(blob => URL.createObjectURL(blob))
      }),
    }),
  }),
});
