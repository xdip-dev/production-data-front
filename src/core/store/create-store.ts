import { ThunkDispatch, UnknownAction, configureStore } from "@reduxjs/toolkit";
import { ErpGateway } from "../erp/gateway/erp.gateway";
import { StepProductionGateway } from "../production/gateway/step-production.gateway";
import { FakeErpGateway } from "../erp/gateway/fake-erp.gateway";
import { FakeStepProductionGateway } from "../production/gateway/fake-step-production.gateway";
import { reducer } from "./reducer";
import { ActionsGateway } from "../actions/gateways/actions.gateway";
import { FakeActionsGateway } from "../actions/gateways/fake-actions.gateway";

export type Dependencies = {
	erpGateway: ErpGateway;
	stepProductionGateway: StepProductionGateway;
	actionsGateway: ActionsGateway;
};

export const rootReducer = reducer;
export const createAppStore = (dependencies: Dependencies) =>
	configureStore({
		reducer: rootReducer,
		middleware(getDefaultMiddleware) {
			return getDefaultMiddleware({
				thunk: {
					extraArgument: dependencies,
				},
			});
		},
	});

export type AppStore = ReturnType<typeof createAppStore>;
export type AppRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<AppRootState, Dependencies, UnknownAction>;

export const createTestStore = ({
	erpGateway = new FakeErpGateway(),
	stepProductionGateway = new FakeStepProductionGateway(),
	actionsGateway = new FakeActionsGateway(),
}: Partial<Dependencies> = {}) => createAppStore({ erpGateway, stepProductionGateway, actionsGateway });
