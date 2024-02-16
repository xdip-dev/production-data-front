import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, Dependencies, AppRootState } from "./create-store";
import { AsyncThunkError } from "../ErrorType";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
	state: AppRootState;
	dispatch: AppDispatch;
	rejectValue: AsyncThunkError;
	extra: Dependencies;
}>();
