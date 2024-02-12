import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, Dependencies, AppRootState } from "./create-store";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
	state: AppRootState;
	dispatch: AppDispatch;
	extra: Dependencies;
}>();
