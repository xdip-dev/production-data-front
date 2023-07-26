import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Operator } from "../domain/Operator";
import { Problem } from "../domain/Problem";
import { serverApi } from "../../../store/ApiServer";
import { Model } from "../domain/Model";

export interface ProductionState {
  operator: Operator[];
  model: Model[];
  action: string[];
  problem: Problem[] | undefined;
  showAfterSelectOperator:boolean;
}

const initialState: ProductionState = {
  operator: [],
  action: [],
  model: [],
  problem: [],
  showAfterSelectOperator:false,
};

export const productionSlice = createSlice({
  name: "production",
  initialState,
  reducers: {
    showAfterOperatorSelected: (state, action: PayloadAction<boolean>) => {
      state.showAfterSelectOperator = action.payload;
    },
    operatorsListed: (state, action: PayloadAction<Operator[]>) => {
      state.operator = action.payload;
    },
    modelsListed: (state, action: PayloadAction<Model[]>) => {
      state.model = action.payload;
    },
    actionsListed: (state, action: PayloadAction<string[]>) => {
      state.action = action.payload;
    },
    problemListed: (state, action: PayloadAction<Problem[]>) => {
      state.problem = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      serverApi.endpoints.getAllOperators.matchFulfilled,
      (state, action) => {
        state.operator = action.payload;
      }
    )
    .addMatcher(
        serverApi.endpoints.getAllModels.matchFulfilled,
        (state, action) => {
          state.model = action.payload;
        }
      );
  },
});

export const { actionsListed, modelsListed, operatorsListed, problemListed,showAfterOperatorSelected } =
  productionSlice.actions;

export default productionSlice.reducer;
