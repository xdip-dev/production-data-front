import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Operator } from "../domain/Operator";
import { Problem } from "../domain/Problem";
import { serverApi } from "./ApiServer";
import { Model } from "../domain/Model";
import { ActionProduction } from "../domain/Actions";

export interface ProductionState {
  operatorList: Operator[];
  modelList: Model[];
  actionList: string[];
  problem: Problem[] | undefined;
  showAfterSelectOperator:boolean;
  action:ActionProduction
}

const initialState: ProductionState = {
  operatorList: [],
  actionList: [],
  modelList: [],
  problem: [],
  showAfterSelectOperator:false,
  action:{
    action:'',
    model:'',
    __id:undefined,
    bonne:0,
    rebut:0
  }
};

export const productionSlice = createSlice({
  name: "production",
  initialState,
  reducers: {
    showAfterOperatorSelected: (state, action: PayloadAction<boolean>) => {
      state.showAfterSelectOperator = action.payload;
    },
    operatorsListed: (state, action: PayloadAction<Operator[]>) => {
      state.operatorList = action.payload;
    },
    modelsListed: (state, action: PayloadAction<Model[]>) => {
      state.modelList = action.payload;
    },
    actionsListed: (state, action: PayloadAction<string[]>) => {
      state.actionList = action.payload;
    },
    problemListed: (state, action: PayloadAction<Problem[]>) => {
      state.problem = action.payload;
    },
    quantityActionSet: (state, action: PayloadAction<{bonne:number,rebut:number}>) => {
      state.action.bonne = action.payload.bonne;
      state.action.rebut = action.payload.rebut;
    },
    infoActionSet: (state, action: PayloadAction<{action:string,model:string,__id:number}>) => {
      state.action.model=action.payload.model
      state.action.action=action.payload.action
      state.action.__id=action.payload.__id
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      serverApi.endpoints.getAllOperators.matchFulfilled,
      (state, action) => {
        state.operatorList = action.payload;
      }
    )
    .addMatcher(
        serverApi.endpoints.getAllModels.matchFulfilled,
        (state, action) => {
          state.modelList = action.payload;
        }
      );
  },
});

export const { actionsListed, modelsListed, operatorsListed, problemListed,showAfterOperatorSelected,infoActionSet,quantityActionSet } =
  productionSlice.actions;

export default productionSlice.reducer;
